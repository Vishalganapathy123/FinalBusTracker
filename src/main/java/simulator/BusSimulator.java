package simulator;

import service.BusLocationReceiver;
import model.BusLocation;
import model.Route;
import model.RouteStop;
import model.Schedule;
import repository.RouteRepository;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class BusSimulator implements Runnable {

    private final BusLocationReceiver receiver;
    private final Schedule schedule;
    private final Route route;

    private String status;
    private double distanceCovered;
    private double speed; // km/h
    private int currentStopIndex;
    private double dwellTimerSeconds;

    private final int TICK_INTERVAL_MS = 4000;
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");

    public BusSimulator(BusLocationReceiver receiver, RouteRepository routeRepository, Schedule schedule) {
        this.receiver = receiver;
        this.schedule = schedule;
        this.route = routeRepository.getRouteById(schedule.getRouteId());
    }

    @Override
    public void run() {
        // Safety check for valid route data
        if (route == null || route.getRouteStops() == null || route.getRouteStops().isEmpty()) {
            ScheduleManager.removeFromActiveSchedules(schedule.getScheduleId());
            return;
        }

        List<RouteStop> routeStops = route.getRouteStops();
        LocalTime depTime = LocalTime.parse(schedule.getDepartureTime(), TIME_FORMATTER);
        LocalTime arrTime = LocalTime.parse(schedule.getArrivalTime(), TIME_FORMATTER);

        double totalRouteDistance = getDistanceFromStartForStop(routeStops.size() - 1, routeStops);

        // Calculate speed accounting for dwell times at intermediate stops
        long totalJourneySeconds = java.time.Duration.between(depTime, arrTime).getSeconds();
        int intermediateStopsCount = Math.max(0, routeStops.size() - 2);
        long totalDwellSeconds = intermediateStopsCount * 30L;

        long netDrivingSeconds = totalJourneySeconds - totalDwellSeconds;
        if (netDrivingSeconds <= 60) {
            netDrivingSeconds = 60; // Fallback minimum 1 minute driving
        }

        this.speed = (totalRouteDistance / (netDrivingSeconds / 3600.0));

        reconstructStartupState(LocalTime.now(), depTime, arrTime, routeStops);

        while (!"COMPLETED".equals(status) && !Thread.currentThread().isInterrupted()) {
            LocalTime now = LocalTime.now();
            double deltaTimeHours = TICK_INTERVAL_MS / 3600000.0;
            double deltaTimeSeconds = TICK_INTERVAL_MS / 1000.0;

            switch (status) {
                case "WAITING":
                    if (!now.isBefore(depTime)) {
                        status = "RUNNING";
                    }
                    break;

                case "RUNNING":
                    if (currentStopIndex >= routeStops.size() - 1) {
                        status = "COMPLETED";
                        break;
                    }

                    distanceCovered += speed * deltaTimeHours;
                    double nextStopDist = getDistanceFromStartForStop(currentStopIndex + 1, routeStops);

                    if (distanceCovered >= nextStopDist) {
                        distanceCovered = nextStopDist;
                        currentStopIndex++;

                        if (currentStopIndex >= routeStops.size() - 1) {
                            status = "COMPLETED";
                        } else {
                            status = "AT_STOP";
                            dwellTimerSeconds = 30.0;
                        }
                    }
                    break;

                case "AT_STOP":
                    dwellTimerSeconds -= deltaTimeSeconds;
                    if (dwellTimerSeconds <= 0) {
                        status = "RUNNING";
                    }
                    break;
            }

            BusLocation payload = createBusLocationPayload(now, routeStops, totalRouteDistance);

            System.out.printf(
                "Bus=%s | Status=%s | Speed=%.2f km/h | CurrentStop=%s (%s) | NextStop=%s (%s) | Progress=%.2f%%%n",
                payload.getBusId(),
                payload.getStatus(),
                payload.getSpeed(),
                payload.getCurrentStopName(), payload.getCurrentStopId(),
                payload.getNextStopName(), payload.getNextStopId(),
                payload.getProgress()
            );

            if (receiver != null) {
                receiver.onReceiveLiveData(payload);
            }

            if ("COMPLETED".equals(status)) {
                ScheduleManager.removeFromActiveSchedules(schedule.getScheduleId());
                break;
            }

            try {
                Thread.sleep(TICK_INTERVAL_MS);
            } catch (InterruptedException e) {
                ScheduleManager.removeFromActiveSchedules(schedule.getScheduleId());
                Thread.currentThread().interrupt();
                break;
            }
        }
    }

    private void reconstructStartupState(LocalTime now, LocalTime dep, LocalTime arr, List<RouteStop> stops) {
        if (now.isBefore(dep)) {
            status = "WAITING";
            distanceCovered = 0.0;
            currentStopIndex = 0;
            return;
        }

        if (!now.isBefore(arr)) {
            status = "COMPLETED";
            distanceCovered = getDistanceFromStartForStop(stops.size() - 1, stops);
            currentStopIndex = stops.size() - 1;
            return;
        }

        long elapsedSeconds = java.time.Duration.between(dep, now).getSeconds();
        double accumulatedSeconds = 0;

        for (int i = 0; i < stops.size() - 1; i++) {
            double currentStopDist = getDistanceFromStartForStop(i, stops);
            double nextStopDist = getDistanceFromStartForStop(i + 1, stops);
            double segmentDist = nextStopDist - currentStopDist;

            double segmentDriveSeconds = (speed > 0) ? (segmentDist / speed) * 3600.0 : 0;

            if (elapsedSeconds < accumulatedSeconds + segmentDriveSeconds) {
                status = "RUNNING";
                currentStopIndex = i;
                double secondsInSegment = elapsedSeconds - accumulatedSeconds;
                distanceCovered = currentStopDist + (speed * (secondsInSegment / 3600.0));
                return;
            }

            accumulatedSeconds += segmentDriveSeconds;

            if (elapsedSeconds < accumulatedSeconds + 30.0) {
                status = "AT_STOP";
                currentStopIndex = i + 1;
                distanceCovered = getDistanceFromStartForStop(i + 1, stops);
                dwellTimerSeconds = (accumulatedSeconds + 30.0) - elapsedSeconds;
                return;
            }

            accumulatedSeconds += 30.0;
        }

        status = "COMPLETED";
        distanceCovered = getDistanceFromStartForStop(stops.size() - 1, stops);
        currentStopIndex = stops.size() - 1;
    }

    /**
     * Reads distance for a target stop index directly from the list.
     * Prevents multi-summing when database already stores cumulative values.
     */
    private double getDistanceFromStartForStop(int index, List<RouteStop> stops) {
        if (stops == null || index < 0 || index >= stops.size()) {
            return 0.0;
        }
        return stops.get(index).getDistanceFromPrevious();
    }

    private BusLocation createBusLocationPayload(LocalTime now, List<RouteStop> stops, double totalRouteDistance) {
        BusLocation data = new BusLocation();

        data.setBusId(schedule.getBusId());
        data.setScheduleId(schedule.getScheduleId());
        data.setRouteId(schedule.getRouteId());
        data.setStatus(status);
        data.setDistanceCovered(distanceCovered);

        double remaining = totalRouteDistance - distanceCovered;
        data.setDistanceRemaining(Math.max(0.0, remaining));

        double progress = (totalRouteDistance > 0) ? (distanceCovered / totalRouteDistance) * 100.0 : 0.0;
        data.setProgress(Math.min(100.0, progress));

        int safeIndex = Math.min(currentStopIndex, stops.size() - 1);

        // Fetch & set Current Stop ID and Name
        RouteStop currentStop = stops.get(safeIndex);
        data.setCurrentStopId(currentStop.getStopId());
        data.setCurrentStopName(currentStop.getStopName());

        // Fetch & set Next Stop ID and Name
        if (safeIndex < stops.size() - 1) {
            RouteStop nextStop = stops.get(safeIndex + 1);
            data.setNextStopId(nextStop.getStopId());
            data.setNextStopName(nextStop.getStopName());
        } else {
            data.setNextStopId("DESTINATION_REACHED");
            data.setNextStopName("Destination Reached");
        }

        data.setSpeed("AT_STOP".equals(status) || "WAITING".equals(status) || "COMPLETED".equals(status) ? 0.0 : speed);
        data.setLastUpdated(now.toString());

        return data;
    }
}