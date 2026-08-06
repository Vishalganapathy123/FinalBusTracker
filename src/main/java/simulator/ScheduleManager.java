package simulator;
 
import service.BusLocationReceiver;
import model.Schedule;
import repository.RouteRepository;
import repository.ScheduleRepository;
 
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
 
public class ScheduleManager implements Runnable {
 
    private final ScheduleRepository scheduleRepository;
    private final RouteRepository routeRepository;
    private final BusLocationReceiver receiver;
 
    private static final Set<String> activeSchedules = Collections.synchronizedSet(new HashSet<>());
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");
 
    public ScheduleManager(ScheduleRepository scheduleRepository,
                           RouteRepository routeRepository,
                           BusLocationReceiver receiver) {
        this.scheduleRepository = scheduleRepository;
        this.routeRepository = routeRepository;
        this.receiver = receiver;
    }
 
    public static void removeFromActiveSchedules(String scheduleId) {
        activeSchedules.remove(scheduleId);
    }
 
    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                List<Schedule> schedules = scheduleRepository.getAllSchedules();
                LocalTime now = LocalTime.now();
                String today = LocalDate.now().getDayOfWeek().name();
 
                for (Schedule schedule : schedules) {
                    String scheduleId = schedule.getScheduleId();
 
                    boolean operatesToday = schedule.getOperatingDays().stream()
                            .anyMatch(day -> day.equalsIgnoreCase(today));
 
                    if (!operatesToday) {
                        continue;
                    }
 
                    LocalTime dep = LocalTime.parse(schedule.getDepartureTime(), TIME_FORMATTER);
                    LocalTime arr = LocalTime.parse(schedule.getArrivalTime(), TIME_FORMATTER);
 
                    if (now.isBefore(arr) && !activeSchedules.contains(scheduleId)) {
                        // Pass receiver instance to BusSimulator
                        BusSimulator simulator = new BusSimulator(receiver, routeRepository, schedule);
                        Thread busThread = new Thread(simulator, "BusThread-" + schedule.getBusId());
                        busThread.start();
                    }
                }
 
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                break;
            }
        }
    }
}
 