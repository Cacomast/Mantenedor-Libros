export interface Libros {
    libroId:number,
    isbn:string,
    titulo:string,
    annio:number,
    autor:string,
    editorial:string,
    precio:number,
    tapa:string,
    stock:number,
    inventario:Inventario[]
}

export interface Inventario {
    inventarioId:number;
    libroId:number;
    libro: string;
    sucursalId:number;
    sucursal: string;
    cantidad:number;
}