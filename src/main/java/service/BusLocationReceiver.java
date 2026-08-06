package service;
 
import model.BusLocation;
 
public interface BusLocationReceiver {
    void onReceiveLiveData(BusLocation busLocation);
}
 