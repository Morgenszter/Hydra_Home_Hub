export type TargetType =

"DEVICE" |

"LOCATION" |

"SENSOR" |

"UNKNOWN";



export interface Target {


id:string;


name:string;


type:TargetType;


distance?:number;


signal?:number;


coordinates?:{

  x:number;

  y:number;

};



active:boolean;


}