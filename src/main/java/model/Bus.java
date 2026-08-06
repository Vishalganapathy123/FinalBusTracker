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

    public Bus(String busId, String busNumber,
               String busName, String busType,
               String routeId) {

        this.busId = busId;
        this.busNumber = busNumber;
        this.busName = busName;
        this.busType = busType;
        this.routeId = routeId;
    }

    // Getters and Setters
}
