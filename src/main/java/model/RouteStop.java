package model;

public class RouteStop {

    private String stopId;
    private String stopName;
    private int stopOrder;
    private double distanceFromPrevious;

    public RouteStop() {
    }

    public RouteStop(String stopId, String stopName,
                     int stopOrder, double distanceFromPrevious) {

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
}