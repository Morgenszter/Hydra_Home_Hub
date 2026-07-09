export interface LotusState {

  connected: boolean;

  battery: number;

  mode: number;

  intensity: number;

  temperature: number;

  firmware?: string;

  hardware?: string;

}

const state: LotusState = {

  connected: false,

  battery: 0,

  mode: 0,

  intensity: 0,

  temperature: 0

};

export default state;