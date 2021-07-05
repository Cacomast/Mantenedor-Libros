import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { Cliente } from '../../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  urlCliente:string = environment.apiCliente.toString();

  resp: Observable<any> | undefined;

  constructor( private http: HttpClient) { }

  getClientes(){

    const urlGetClientes= `${environment.apiHost.toString()}${this.urlCliente}/getAllClientes`;
    console.log(urlGetClientes);

    return this.resp = this.http.get(urlGetClientes);
  }

  
  addCliente( cliente: Cliente){

    const urlAddClinte = `${environment.apiHost.toString()}${this.urlCliente}/addCliente`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      clienteId: cliente.clienteId,
      rut: cliente.rut,
      dv: cliente.dv,
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      correo: cliente.correo,
      password: cliente.password,
      valor: cliente.valor,
      comunaId: cliente.comunaId
    });

    console.log(urlAddClinte);
    console.log(body);

    return this.resp = this.http.post(urlAddClinte, body, options);
  }

  updateCliente( cliente: Cliente){

    const urlUpdateCliente = `${environment.apiHost.toString()}${this.urlCliente}/updateLibro?id=${cliente.clienteId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      clienteId: cliente.clienteId,
      rut: cliente.rut,
      dv: cliente.dv,
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      correo: cliente.correo,
      password: cliente.password,
      valor: cliente.valor,
      comunaId: cliente.comunaId,
      estado: cliente.estado
    });

    console.log(urlUpdateCliente);
    console.log(body);

    return this.resp = this.http.put(urlUpdateCliente, body, options);
  }

  deleteCliente( cliente: Cliente){

    const urlDeleteCliente = `${environment.apiHost.toString()}${this.urlCliente}/deleteCliente?id=${cliente.clienteId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    console.log(urlDeleteCliente);

    return this.resp = this.http.delete(urlDeleteCliente, options);
  }

}

