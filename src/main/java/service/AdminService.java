package service;

import java.util.List;
import model.Bus;
import model.BusLocation;
import model.Route;
import model.Schedule;
import model.Stop;

import repository.BusLocationRepository;
import repository.BusRepository;
import repository.RouteRepository;
import repository.ScheduleRepository;
import repository.StopRepository;

public class AdminService implements BusLocationReceiver {

    private final BusRepository busRepository;
    private final StopRepository stopRepository;
    private final RouteRepository routeRepository;
    private final ScheduleRepository scheduleRepository;
    private final BusLocationRepository busLocationRepository;

    public AdminService() {
        this.busRepository = new BusRepository();
        this.stopRepository = new StopRepository();
        this.routeRepository = new RouteRepository();
        this.scheduleRepository = new ScheduleRepository();
        this.busLocationRepository = new BusLocationRepository();
    }

    // ===========================
    // BUS LOCATION RECEIVER IMPLEMENTATION
    // ===========================

    @Override
    public void onReceiveLiveData(BusLocation busLocation) {
        if (busLocation == null || busLocation.getBusId() == null || busLocation.getBusId().trim().isEmpty()) {
            return;
        }

        // Delegate atomic save/update (upsert) to repository to prevent race conditions
        busLocationRepository.saveOrUpdateBusLocation(busLocation);
    }

    // ===========================
    // BUS OPERATIONS
    // ===========================

    public void addBus(Bus bus) {
        if (bus != null) {
            busRepository.addBus(bus);
        }
    }

    public List<Bus> getAllBuses() {
        return busRepository.getAllBuses();
    }

    public Bus getBusById(String busId) {
        if (busId == null || busId.trim().isEmpty()) return null;
        return busRepository.getBusById(busId);
    }

    public void updateBus(Bus bus) {
        if (bus != null) {
            busRepository.updateBus(bus);
        }
    }

    public void deleteBus(String busId) {
        if (busId != null && !busId.trim().isEmpty()) {
            busRepository.deleteBus(busId);
        }
    }

    // ===========================
    // STOP OPERATIONS
    // ===========================

    public void addStop(Stop stop) {
        if (stop != null) {
            stopRepository.addStop(stop);
        }
    }

    public List<Stop> getAllStops() {
        return stopRepository.getAllStops();
    }

    public Stop getStopById(String stopId) {
        if (stopId == null || stopId.trim().isEmpty()) return null;
        return stopRepository.getStopById(stopId);
    }

    public void updateStop(Stop stop) {
        if (stop != null) {
            stopRepository.updateStop(stop);
        }
    }

    public void deleteStop(String stopId) {
        if (stopId != null && !stopId.trim().isEmpty()) {
            stopRepository.deleteStop(stopId);
        }
    }

    // ===========================
    // ROUTE OPERATIONS
    // ===========================

    public void addRoute(Route route) {
        if (route != null) {
            routeRepository.addRoute(route);
        }
    }

    public List<Route> getAllRoutes() {
        return routeRepository.getAllRoutes();
    }

    public Route getRouteById(String routeId) {
        if (routeId == null || routeId.trim().isEmpty()) return null;
        return routeRepository.getRouteById(routeId);
    }

    public void updateRoute(Route route) {
        if (route != null) {
            routeRepository.updateRoute(route);
        }
    }

    public void deleteRoute(String routeId) {
        if (routeId != null && !routeId.trim().isEmpty()) {
            routeRepository.deleteRoute(routeId);
        }
    }

    // ===========================
    // SCHEDULE OPERATIONS
    // ===========================

    public void addSchedule(Schedule schedule) {
        if (schedule != null) {
            scheduleRepository.addSchedule(schedule);
        }
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.getAllSchedules();
    }

    public Schedule getScheduleById(String scheduleId) {
        if (scheduleId == null || scheduleId.trim().isEmpty()) return null;
        return scheduleRepository.getScheduleById(scheduleId);
    }

    public void updateSchedule(Schedule schedule) {
        if (schedule != null) {
            scheduleRepository.updateSchedule(schedule);
        }
    }

    public void deleteSchedule(String scheduleId) {
        if (scheduleId != null && !scheduleId.trim().isEmpty()) {
            scheduleRepository.deleteSchedule(scheduleId);
        }
    }

    // ===========================
    // BUS LOCATION OPERATIONS
    // ===========================

    public void addBusLocation(BusLocation busLocation) {
        if (busLocation != null) {
            busLocationRepository.addBusLocation(busLocation);
        }
    }

    public List<BusLocation> getAllBusLocations() {
        return busLocationRepository.getAllBusLocations();
    }

    public BusLocation getBusLocationByBusId(String busId) {
        if (busId == null || busId.trim().isEmpty()) return null;
        return busLocationRepository.getBusLocationByBusId(busId);
    }

    public void updateBusLocation(BusLocation busLocation) {
        if (busLocation != null) {
            busLocationRepository.updateBusLocation(busLocation);
        }
    }

    public void deleteBusLocation(String busId) {
        if (busId != null && !busId.trim().isEmpty()) {
            busLocationRepository.deleteBusLocation(busId);
        }
    }
}