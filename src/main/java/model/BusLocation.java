package model;

public class BusLocation {

    private String busId;
    private double latitude;
    private double longitude;
    private double speed;

    private String currentStop;
    private String nextStop;

    private String lastUpdated;

    public BusLocation() {
    }

    public BusLocation(String busId,
                       double latitude,
                       double longitude,
                       double speed,
                       String currentStop,
                       String nextStop,
                       String lastUpdated) {

        this.busId = busId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.currentStop = currentStop;
        this.nextStop = nextStop;
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

    public String getCurrentStop() {
        return currentStop;
    }

    public void setCurrentStop(String currentStop) {
        this.currentStop = currentStop;
    }

    public String getNextStop() {
        return nextStop;
    }

    public void setNextStop(String nextStop) {
        this.nextStop = nextStop;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
