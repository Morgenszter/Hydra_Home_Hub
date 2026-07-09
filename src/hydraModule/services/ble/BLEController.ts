import {BleManager} from "react-native-ble-plx";
export default new class BLEController{
manager=new BleManager();
start(cb:(d:any)=>void){this.manager.startDeviceScan(null,null,(_,d)=>d&&cb(d));}
stop(){this.manager.stopDeviceScan();}
}();