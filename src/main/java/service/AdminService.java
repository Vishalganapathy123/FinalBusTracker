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

public class AdminService {

    private final BusRepository busRepository;
    private final StopRepository stopRepository;
    private final RouteRepository routeRepository;
    private final ScheduleRepository scheduleRepository;
    private final BusLocationRepository busLocationRepository;

    public AdminService() {

        busRepository = new BusRepository();
        stopRepository = new StopRepository();
        routeRepository = new RouteRepository();
        scheduleRepository = new ScheduleRepository();
        busLocationRepository = new BusLocationRepository();

    }

    // ===========================
    // BUS
    // ===========================

    public void addBus(Bus bus) {
        busRepository.addBus(bus);
    }

    public List<Bus> getAllBuses() {
        return busRepository.getAllBuses();
    }

    public Bus getBusById(String busId) {
        return busRepository.getBusById(busId);
    }

    public void updateBus(Bus bus) {
        busRepository.updateBus(bus);
    }

    public void deleteBus(String busId) {
        busRepository.deleteBus(busId);
    }

    // ===========================
    // STOP
    // ===========================

    public void addStop(Stop stop) {
        stopRepository.addStop(stop);
    }

    public List<Stop> getAllStops() {
        return stopRepository.getAllStops();
    }

    public Stop getStopById(String stopId) {
        return stopRepository.getStopById(stopId);
    }

    public void updateStop(Stop stop) {
        stopRepository.updateStop(stop);
    }

    public void deleteStop(String stopId) {
        stopRepository.deleteStop(stopId);
    }

    // ===========================
    // ROUTE
    // ===========================

    public void addRoute(Route route) {
        routeRepository.addRoute(route);
    }

    public List<Route> getAllRoutes() {
        return routeRepository.getAllRoutes();
    }

    public Route getRouteById(String routeId) {
        return routeRepository.getRouteById(routeId);
    }

    public void updateRoute(Route route) {
        routeRepository.updateRoute(route);
    }

    public void deleteRoute(String routeId) {
        routeRepository.deleteRoute(routeId);
    }

    // ===========================
    // SCHEDULE
    // ===========================

    public void addSchedule(Schedule schedule) {
        scheduleRepository.addSchedule(schedule);
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.getAllSchedules();
    }

    public Schedule getScheduleById(String scheduleId) {
        return scheduleRepository.getScheduleById(scheduleId);
    }

    public void updateSchedule(Schedule schedule) {
        scheduleRepository.updateSchedule(schedule);
    }

    public void deleteSchedule(String scheduleId) {
        scheduleRepository.deleteSchedule(scheduleId);
    }

    // ===========================
    // BUS LOCATION
    // ===========================

    public void addBusLocation(BusLocation busLocation) {
        busLocationRepository.addBusLocation(busLocation);
    }

    public List<BusLocation> getAllBusLocations() {
        return busLocationRepository.getAllBusLocations();
    }

    public BusLocation getBusLocationByBusId(String busId) {
        return busLocationRepository.getBusLocationByBusId(busId);
    }

    public void updateBusLocation(BusLocation busLocation) {
        busLocationRepository.updateBusLocation(busLocation);
    }

    public void deleteBusLocation(String busId) {
        busLocationRepository.deleteBusLocation(busId);
    }

}