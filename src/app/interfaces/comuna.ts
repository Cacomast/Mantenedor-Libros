export interface Comuna {
    comunaId:number,
    nombre:string;
    regionId:number,
    region:string,
    estado:boolean
}

export interface Tabla {
    title:string;
    headers:string[];
    values:any[];
    button:string;
    regiones:any[];
}