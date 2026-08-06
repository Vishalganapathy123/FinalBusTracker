package model;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class RouteStop {

    @BsonProperty("stopId")
    private String stopId;

    @BsonProperty("stopName")
    private String stopName;

    @BsonProperty("stopOrder")
    private int stopOrder;

    @BsonProperty("distanceFromPrevious")
    private double distanceFromPrevious;

    public RouteStop() {
    }

    public RouteStop(String stopId,
                     String stopName,
                     int stopOrder,
                     double distanceFromPrevious) {

        this.stopId = stopId;
        this.stopName = stopName;
        this.stopOrder = stopOrder;
        this.distanceFromPrevious = distanceFromPrevious;
    }

    // Getters and Setters
}
