export interface ParsedPacket {

  command: number;

  payload: Uint8Array;

}

class BLEParser {

  parse(
    data: Uint8Array
  ): ParsedPacket {

    return {

      command:
        data[0],

      payload:
        data.slice(1)

    };

  }

  encode(

    command:number,

    payload:number[]

  ){

    return Uint8Array.from([

      command,

      ...payload

    ]);

  }

}

const parser =
  new BLEParser();

export default parser;