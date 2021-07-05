export interface Inventario {
    libroId:number,
    isbn:string,
    titulo:string,
    autor:string,
    stock:number,
    inventario:InventarioSucursal[]
}

export interface Tabla {
    title:string;
    headers:string[];
    values:any[];
    button:string;
    stockCritico:number;
}

export interface InventarioSucursal {
    inventarioId:number;
    libroId:number;
    libro: string;
    sucursalId:number;
    sucursal: string;
    cantidad:number;
}