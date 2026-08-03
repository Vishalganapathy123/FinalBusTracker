package model;

public class BusLocation {

    private String busId;
    private double latitude;
    private double longitude;
    private double speed;
    private String currentStopId;
    private String nextStopId;
    private String lastUpdated;

    public BusLocation() {
    }

    public BusLocation(String busId, double latitude, double longitude,
                       double speed, String currentStopId,
                       String nextStopId, String lastUpdated) {

        this.busId = busId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.currentStopId = currentStopId;
        this.nextStopId = nextStopId;
        this.lastUpdated = lastUpdated;
    }

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
}