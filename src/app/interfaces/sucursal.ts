export interface Sucursal {
    sucursalId:number,
    nombre:string;
    direccion:string,
    encargado:string,
    comunaId:number,
    comuna:string,
    estado:boolean
}

export interface Tabla {
    title:string;
    headers:string[];
    values:any[];
    button:string;
    comunas:any[];
}