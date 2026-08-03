package model;

import java.util.List;

public class Route {

    private String routeId;
    private String routeName;
    private List<String> stopIds;

    public Route() {
    }

    public Route(String routeId, String routeName, List<String> stopIds) {
        this.routeId = routeId;
        this.routeName = routeName;
        this.stopIds = stopIds;
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
}