package model;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

public class Stop {

    @BsonId
    @BsonProperty("stopId")
    private String stopId;

    @BsonProperty("stopName")
    private String stopName;

    public Stop() {
    }

    public Stop(String stopId, String stopName) {
        this.stopId = stopId;
        this.stopName = stopName;
    }

    // Getters and Setters
}
