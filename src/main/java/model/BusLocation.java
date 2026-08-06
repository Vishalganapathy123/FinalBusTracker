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
    private String currentStop;

    @BsonProperty("nextStop")
    private String nextStop;

    @BsonProperty("lastUpdated")
    private String lastUpdated;

    public BusLocation() {
    }

    // Constructors

    // Getters and Setters
}
