[3:12 PM] Madhumitha M
package model;
 
import java.util.List;
 
public class Route {
 
    private String routeId;

    private String routeName;

    private List<String> stopIds;

    private double distance;
 
    public Route() {

    }
 
    public Route(String routeId, String routeName, List<String> stopIds, double distance) {

        this.routeId = routeId;

        this.routeName = routeName;

        this.stopIds = stopIds;

        this.distance = distance;

    }
 
    public String getRouteId() {

        return routeId;

    }
 
    public void setRouteId(String routeId) {

        this.routeId = routeId;

    }
 
    public String getRouteName() {

        return routeName;

    }
 
    public void setRouteName(String routeName) {

        this.routeName = routeName;

    }
 
    public List<String> getStopIds() {

        return stopIds;

    }
 
    public void setStopIds(List<String> stopIds) {

        this.stopIds = stopIds;

    }
 
    public double getDistance() {

        return distance;

    }
 
    public void setDistance(double distance) {

        this.distance = distance;

    }

}
 
