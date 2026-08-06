package model;
 
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
 
public class Bus {
 
    @BsonId
    @BsonProperty("busId")
    private String busId;
 
    @BsonProperty("busNumber")
    private String busNumber;
 
    @BsonProperty("busName")
    private String busName;
 
    @BsonProperty("busType")
    private String busType;
 
    @BsonProperty("routeId")
    private String routeId;
 
    public Bus() {
    }
 
    public Bus(String busId, String busNumber, String busName, String busType, String routeId) {
        this.busId = busId;
        this.busNumber = busNumber;
        this.busName = busName;
        this.busType = busType;
        this.routeId = routeId;
    }
 
    // Getters and Setters
 
    public String getBusId() {
        return busId;
    }
 
    public void setBusId(String busId) {
        this.busId = busId;
    }
 
    public String getBusNumber() {
        return busNumber;
    }
 
    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }
 
    public String getBusName() {
        return busName;
    }
 
    public void setBusName(String busName) {
        this.busName = busName;
    }
 
    public String getBusType() {
        return busType;
    }
 
    public void setBusType(String busType) {
        this.busType = busType;
    }
 
    public String getRouteId() {
        return routeId;
    }
 
    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }
 
    @Override
    public String toString() {
        return "Bus{" +
                "busId='" + busId + '\'' +
                ", busNumber='" + busNumber + '\'' +
                ", busName='" + busName + '\'' +
                ", busType='" + busType + '\'' +
                ", routeId='" + routeId + '\'' +
                '}';
    }
}
 