export interface Cliente {
    clienteId: number;
    rut: number;
    dv: string;
    rutCompleto: string;
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
    password: string;
    valor: string;
    comunaId: number;
    comuna: string;
    estado: boolean;
}

export interface Tabla {
    title:string;
    headers:string[];
    values:any[];
    button:string;
    comunas:any[];
}
