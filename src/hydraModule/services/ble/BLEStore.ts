export default class BLEStore{
devices:any[]=[];
setDevices(d:any[]){this.devices=d;}
getDevices(){return this.devices;}
}