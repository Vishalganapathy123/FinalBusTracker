package model;
 
import org.bson.BsonType;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.codecs.pojo.annotations.BsonRepresentation;
 
public class Stop {
 
    @BsonId
    @BsonProperty("stopId")
    @BsonRepresentation(BsonType.OBJECT_ID) // Tells MongoDB driver to convert ObjectId <-> String
    private String stopId;
 
    @BsonProperty("stopName")
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
 