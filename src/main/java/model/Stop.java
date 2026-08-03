package model;

public class Stop {

    private String stopId;
    private String stopName;

    public Stop() {
    }

    public Stop(String stopId, String stopName) {
        this.stopId = stopId;
        this.stopName = stopName;
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
}