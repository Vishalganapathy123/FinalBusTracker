package model;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

public class Route {

    @BsonId
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

    public Route(String routeId,
                 String routeName,
                 double distance,
                 List<RouteStop> routeStops) {

        this.routeId = routeId;
        this.routeName = routeName;
        this.distance = distance;
        this.routeStops = routeStops;
    }

    // Getters and Setters
}
