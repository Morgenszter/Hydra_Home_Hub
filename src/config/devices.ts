export type DeviceType =

"LED" |

"TAPO" |

"TUYA" |

"BLE" |

"UNKNOWN";



export interface DeviceConfig {


id:string;

name:string;

type:DeviceType;

ip?:string;

mac?:string;

online:boolean;

}



export const DEFAULT_DEVICES:
DeviceConfig[] = [

{

id:"hydra-core",

name:"HYDRA CORE",

type:"UNKNOWN",

online:true

}

];