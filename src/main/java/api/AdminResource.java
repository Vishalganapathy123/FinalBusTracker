package api;
 
import java.util.List;
 
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
 
import model.Bus;
import model.Stop;
import model.Route;
import model.Schedule;
import model.BusLocation;
 
import service.AdminService;
 
@Path("/admin")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminResource {
 
    private final AdminService adminService = new AdminService();
 
    // ============================
    // BUS ENDPOINTS
    // ============================
 
    @GET
    @Path("/bus")
    public Response getAllBuses() {
        List<Bus> buses = adminService.getAllBuses();
        return Response.ok(buses).build();
    }
 
    @GET
    @Path("/bus/{busId}")
    public Response getBusById(@PathParam("busId") String busId) {
        Bus bus = adminService.getBusById(busId);
        if (bus == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Bus Not Found")
                    .build();
        }
        return Response.ok(bus).build();
    }
 
    @POST
    @Path("/bus")
    public Response addBus(Bus bus) {
        adminService.addBus(bus);
        return Response.status(Response.Status.CREATED)
                .entity("Bus Added Successfully")
                .build();
    }
 
    @PUT
    @Path("/bus")
    public Response updateBus(Bus bus) {
        adminService.updateBus(bus);
        return Response.ok("Bus Updated Successfully").build();
    }
 
    @DELETE
    @Path("/bus/{busId}")
    public Response deleteBus(@PathParam("busId") String busId) {
        adminService.deleteBus(busId);
        return Response.ok("Bus Deleted Successfully").build();
    }
 
    // ============================
    // STOP ENDPOINTS
    // ============================
 
    @GET
    @Path("/stop")
    public Response getAllStops() {
        List<Stop> stops = adminService.getAllStops();
        return Response.ok(stops).build();
    }
 
    @GET
    @Path("/stop/{stopId}")
    public Response getStopById(@PathParam("stopId") String stopId) {
        Stop stop = adminService.getStopById(stopId);
        if (stop == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Stop Not Found")
                    .build();
        }
        return Response.ok(stop).build();
    }
 
    @POST
    @Path("/stop")
    public Response addStop(Stop stop) {
        adminService.addStop(stop);
        return Response.status(Response.Status.CREATED)
                .entity("Stop Added Successfully")
                .build();
    }
 
    @PUT
    @Path("/stop")
    public Response updateStop(Stop stop) {
        adminService.updateStop(stop);
        return Response.ok("Stop Updated Successfully").build();
    }
 
    @DELETE
    @Path("/stop/{stopId}")
    public Response deleteStop(@PathParam("stopId") String stopId) {
        adminService.deleteStop(stopId);
        return Response.ok("Stop Deleted Successfully").build();
    }
 
    // ============================
    // ROUTE ENDPOINTS
    // ============================
 
    @GET
    @Path("/route")
    public Response getAllRoutes() {
        List<Route> routes = adminService.getAllRoutes();
        return Response.ok(routes).build();
    }
 
    @GET
    @Path("/route/{routeId}")
    public Response getRouteById(@PathParam("routeId") String routeId) {
        Route route = adminService.getRouteById(routeId);
        if (route == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Route Not Found")
                    .build();
        }
        return Response.ok(route).build();
    }
 
    @POST
    @Path("/route")
    public Response addRoute(Route route) {
        adminService.addRoute(route);
        return Response.status(Response.Status.CREATED)
                .entity("Route Added Successfully")
                .build();
    }
 
    @PUT
    @Path("/route")
    public Response updateRoute(Route route) {
        adminService.updateRoute(route);
        return Response.ok("Route Updated Successfully").build();
    }
 
    @DELETE
    @Path("/route/{routeId}")
    public Response deleteRoute(@PathParam("routeId") String routeId) {
        adminService.deleteRoute(routeId);
        return Response.ok("Route Deleted Successfully").build();
    }
 
    // ============================
    // SCHEDULE ENDPOINTS
    // ============================
 
    @GET
    @Path("/schedule")
    public Response getAllSchedules() {
        List<Schedule> schedules = adminService.getAllSchedules();
        return Response.ok(schedules).build();
    }
 
    @GET
    @Path("/schedule/{scheduleId}")
    public Response getScheduleById(@PathParam("scheduleId") String scheduleId) {
        Schedule schedule = adminService.getScheduleById(scheduleId);
        if (schedule == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Schedule Not Found")
                    .build();
        }
        return Response.ok(schedule).build();
    }
 
    @POST
    @Path("/schedule")
    public Response addSchedule(Schedule schedule) {
        adminService.addSchedule(schedule);
        return Response.status(Response.Status.CREATED)
                .entity("Schedule Added Successfully")
                .build();
    }
 
    @PUT
    @Path("/schedule")
    public Response updateSchedule(Schedule schedule) {
        adminService.updateSchedule(schedule);
        return Response.ok("Schedule Updated Successfully").build();
    }
 
    @DELETE
    @Path("/schedule/{scheduleId}")
    public Response deleteSchedule(@PathParam("scheduleId") String scheduleId) {
        adminService.deleteSchedule(scheduleId);
        return Response.ok("Schedule Deleted Successfully").build();
    }
 
    // ============================
    // BUS LOCATION ENDPOINTS
    // ============================
 
    @GET
    @Path("/location")
    public Response getAllBusLocations() {
        List<BusLocation> locations = adminService.getAllBusLocations();
        return Response.ok(locations).build();
    }
 
    @GET
    @Path("/location/{busId}")
    public Response getBusLocationByBusId(@PathParam("busId") String busId) {
        BusLocation location = adminService.getBusLocationByBusId(busId);
        if (location == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Bus Location Not Found")
                    .build();
        }
        return Response.ok(location).build();
    }
 
    @POST
    @Path("/location")
    public Response addBusLocation(BusLocation location) {
        adminService.addBusLocation(location);
        return Response.status(Response.Status.CREATED)
                .entity("Bus Location Saved Successfully")
                .build();
    }
 
    @PUT
    @Path("/location")
    public Response updateBusLocation(BusLocation location) {
        adminService.updateBusLocation(location);
        return Response.ok("Bus Location Updated Successfully").build();
    }
 
    @DELETE
    @Path("/location/{busId}")
    public Response deleteBusLocation(@PathParam("busId") String busId) {
        adminService.deleteBusLocation(busId);
        return Response.ok("Bus Location Deleted Successfully").build();
    }
}
 