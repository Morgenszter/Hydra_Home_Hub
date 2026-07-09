export type VoiceCommand = {


id:string;


phrase:string;


command:string;


enabled:boolean;


};



export interface VoiceState {


listening:boolean;


lastCommand?:string;


confidence?:number;


}