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

    public String getStopId() {
        return stopId;
    }

    public void setStopId(String stopId) {
        this.stopId = stopId;
    }

    public String getStopName() {
        return stopName;
    }

    public void setStopName(String stopName) {
        this.stopName = stopName;
    }

    public int getStopOrder() {
        return stopOrder;
    }

    public void setStopOrder(int stopOrder) {
        this.stopOrder = stopOrder;
    }

    public double getDistanceFromPrevious() {
        return distanceFromPrevious;
    }

    public void setDistanceFromPrevious(double distanceFromPrevious) {
        this.distanceFromPrevious = distanceFromPrevious;
    }

    @Override
    public String toString() {
        return "RouteStop{" +
                "stopId='" + stopId + '\'' +
                ", stopName='" + stopName + '\'' +
                ", stopOrder=" + stopOrder +
                ", distanceFromPrevious=" + distanceFromPrevious +
                '}';
    }
}