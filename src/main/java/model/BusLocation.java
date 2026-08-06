package model;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

public class BusLocation {

    @BsonId
    @BsonProperty("busId")
    private String busId;

    @BsonProperty("latitude")
    private double latitude;

    @BsonProperty("longitude")
    private double longitude;

    @BsonProperty("speed")
    private double speed;

    @BsonProperty("currentStop")
    private String currentStopId;

    @BsonProperty("nextStop")
    private String nextStopId;

    @BsonProperty("lastUpdated")
    private String lastUpdated;

    // Tracking & Simulator Payload Fields
    private String scheduleId;
    private String routeId;
    private String status;
    private double distanceCovered;
    private double distanceRemaining;
    private double progress;
    private double delayMinutes;
    private String eta;

    // Default Constructor
    public BusLocation() {
    }

    // Parameterized Constructor
    public BusLocation(String busId, double speed, String currentStopId,
                       String nextStopId, String lastUpdated) {
        this.busId = busId;
        this.speed = speed;
        this.currentStopId = currentStopId;
        this.nextStopId = nextStopId;
        this.lastUpdated = lastUpdated;
    }

    // ---------------- Bus Details ----------------

    public String getBusId() {
        return busId;
    }

    public void setBusId(String busId) {
        this.busId = busId;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public String getCurrentStopId() {
        return currentStopId;
    }

    public void setCurrentStopId(String currentStopId) {
        this.currentStopId = currentStopId;
    }

    public String getNextStopId() {
        return nextStopId;
    }

    public void setNextStopId(String nextStopId) {
        this.nextStopId = nextStopId;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    // ---------------- Simulator Fields ----------------

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getDistanceCovered() {
        return distanceCovered;
    }

    public void setDistanceCovered(double distanceCovered) {
        this.distanceCovered = distanceCovered;
    }

    public double getDistanceRemaining() {
        return distanceRemaining;
    }

    public void setDistanceRemaining(double distanceRemaining) {
        this.distanceRemaining = distanceRemaining;
    }

    public double getProgress() {
        return progress;
    }

    public void setProgress(double progress) {
        this.progress = progress;
    }

    public double getDelayMinutes() {
        return delayMinutes;
    }

    public void setDelayMinutes(double delayMinutes) {
        this.delayMinutes = delayMinutes;
    }

    public String getEta() {
        return eta;
    }

    public void setEta(String eta) {
        this.eta = eta;
    }

    @Override
    public String toString() {
        return "BusLocation{" +
                "busId='" + busId + '\'' +
                ", scheduleId='" + scheduleId + '\'' +
                ", routeId='" + routeId + '\'' +
                ", status='" + status + '\'' +
                ", currentStopId='" + currentStopId + '\'' +
                ", nextStopId='" + nextStopId + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", speed=" + speed +
                ", distanceCovered=" + distanceCovered +
                ", distanceRemaining=" + distanceRemaining +
                ", progress=" + progress +
                ", delayMinutes=" + delayMinutes +
                ", eta='" + eta + '\'' +
                ", lastUpdated='" + lastUpdated + '\'' +
                '}';
    }
}