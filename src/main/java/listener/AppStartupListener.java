package listener;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

import repository.RouteRepository;
import repository.ScheduleRepository;
import service.AdminService;
import simulator.ScheduleManager;

@WebListener
public class AppStartupListener implements ServletContextListener {

    private Thread scheduleManagerThread;

    @Override
    public void contextInitialized(ServletContextEvent sce) {

        System.out.println("[LISTENER] Starting Bus Simulator...");

        ScheduleRepository scheduleRepository = new ScheduleRepository();
        RouteRepository routeRepository = new RouteRepository();
        AdminService adminService = new AdminService();

        ScheduleManager scheduleManager =
                new ScheduleManager(scheduleRepository, routeRepository, adminService);

        scheduleManagerThread = new Thread(scheduleManager, "ScheduleManager-Thread");
        scheduleManagerThread.setDaemon(true);
        scheduleManagerThread.start();

        System.out.println("[LISTENER] ScheduleManager started.");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {

        System.out.println("[LISTENER] Stopping Bus Simulator...");

        if (scheduleManagerThread != null && scheduleManagerThread.isAlive()) {
            scheduleManagerThread.interrupt();
        }
    }
}