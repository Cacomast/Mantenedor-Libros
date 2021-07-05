export interface Libro {
    libroId:number,
    isbn:string;
    titulo:string,
    autor:string,
    editorial:string,
    annio:number,
    tapa:string,
    precio:number,
    estado:boolean
}

export interface Tabla {
    title:string;
    headers:string[];
    values:any[];
    button:string;
}
