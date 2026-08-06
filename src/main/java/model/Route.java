package model;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class Route {

    @BsonProperty("routeId")
    private String routeId;

    @BsonProperty("routeName")
    private String routeName;

    @BsonProperty("distance")
    private double distance;

    @BsonProperty("routeStops")
    private List<RouteStop> routeStops;

    public Route() {
    }

    public Route(String routeId, String routeName,
                 double distance, List<RouteStop> routeStops) {
        this.routeId = routeId;
        this.routeName = routeName;
        this.distance = distance;
        this.routeStops = routeStops;
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public List<RouteStop> getRouteStops() {
        return routeStops;
    }

    public void setRouteStops(List<RouteStop> routeStops) {
        this.routeStops = routeStops;
    }

    @Override
    public String toString() {
        return "Route{" +
                "routeId='" + routeId + '\'' +
                ", routeName='" + routeName + '\'' +
                ", distance=" + distance +
                ", routeStops=" + routeStops +
                '}';
    }
}