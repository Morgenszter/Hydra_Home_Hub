import { PermissionsAndroid, Platform } from "react-native";


class Permissions {


async bluetooth(){

if(Platform.OS !== "android")
return true;


try {


const result =
await PermissionsAndroid.requestMultiple([

PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,

PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,

PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION

]);


return Object.values(result)
.every(
x => x === "granted"
);


}

catch(error){

console.error(
"BLE Permission error",
error
);


return false;

}


}



async microphone(){

if(Platform.OS !== "android")
return true;


const result =
await PermissionsAndroid.request(
PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
);


return result === "granted";

}



}


export default new Permissions();