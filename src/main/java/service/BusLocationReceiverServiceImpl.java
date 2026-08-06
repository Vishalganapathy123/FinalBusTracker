package service;
 
import model.BusLocation;
import repository.BusLocationRepository;
 
public class BusLocationReceiverServiceImpl implements BusLocationReceiver {
 
    private final BusLocationRepository busLocationRepository;
 
    public BusLocationReceiverServiceImpl() {
        this.busLocationRepository = new BusLocationRepository();
    }
 
    @Override
    public void onReceiveLiveData(BusLocation busLocation) {
        if (busLocation == null || busLocation.getBusId() == null) {
            return;
        }
 
        // Save / Update to MongoDB
        if (busLocationRepository.getBusLocationByBusId(busLocation.getBusId()) == null) {
            busLocationRepository.addBusLocation(busLocation);
        } else {
            busLocationRepository.updateBusLocation(busLocation);
        }
    }
}
 