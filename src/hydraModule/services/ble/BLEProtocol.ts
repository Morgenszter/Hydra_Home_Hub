export const encode=(s:string)=>new TextEncoder().encode(s);
export const decode=(b:Uint8Array)=>new TextDecoder().decode(b);