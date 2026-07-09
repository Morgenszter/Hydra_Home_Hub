import BLEController from "./BLEController";
export default class BLEScanner{
scan(cb:(d:any)=>void){BLEController.start(cb)}
stop(){BLEController.stop()}
}