package model;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

public class Schedule {

    @BsonId
    @BsonProperty("scheduleId")
    private String scheduleId;

    @BsonProperty("busId")
    private String busId;

    @BsonProperty("routeId")
    private String routeId;

    @BsonProperty("sourceName")
    private String sourceName;

    @BsonProperty("destinationName")
    private String destinationName;

    @BsonProperty("departureTime")
    private String departureTime;

    @BsonProperty("arrivalTime")
    private String arrivalTime;

    @BsonProperty("operatingDays")
    private List<String> operatingDays;

    public Schedule() {
    }

    public Schedule(String scheduleId,
                    String busId,
                    String routeId,
                    String sourceName,
                    String destinationName,
                    String departureTime,
                    String arrivalTime,
                    List<String> operatingDays) {

        this.scheduleId = scheduleId;
        this.busId = busId;
        this.routeId = routeId;
        this.sourceName = sourceName;
        this.destinationName = destinationName;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.operatingDays = operatingDays;
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getBusId() {
        return busId;
    }

    public void setBusId(String busId) {
        this.busId = busId;
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getDestinationName() {
        return destinationName;
    }

    public void setDestinationName(String destinationName) {
        this.destinationName = destinationName;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public List<String> getOperatingDays() {
        return operatingDays;
    }

    public void setOperatingDays(List<String> operatingDays) {
        this.operatingDays = operatingDays;
    }
}
