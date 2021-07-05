import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { Inventario } from '../../interfaces/inventario';

@Injectable({
  providedIn: 'root'
})

export class InventarioService {

  urlInventario:string = environment.apiInventario.toString();

  resp: Observable<any> | undefined;

  constructor( private http: HttpClient) { }

  getlistaInventario(){

    const urlGetInventario= `${environment.apiHost.toString()}${this.urlInventario}/getInventario`;
    console.log(urlGetInventario);

    return this.resp = this.http.get(urlGetInventario);
  }

  
  getInventarioSucursal( inventario: Inventario ){

    const urlInventarioSucursal = `${environment.apiHost.toString()}${this.urlInventario}/getInventarioSucursal?id=${inventario.libroId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    console.log(urlInventarioSucursal);

    return this.resp = this.http.get(urlInventarioSucursal, options);
  }

  restarInventario( libroId:number, sucursalId:number, cantidad:number ){

    const urlrestarInventario = `${environment.apiHost.toString()}${this.urlInventario}/restarStock`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      libroId:libroId,
      sucursalId:sucursalId,
      autor:cantidad
    });

    console.log(urlrestarInventario);
    console.log(body);

    return this.resp = this.http.put(urlrestarInventario, body, options);
  }

  actualizarInventario( libroId:number, sucursalId:number, cantidad:number ){

    const urlactualizarInventario = `${environment.apiHost.toString()}${this.urlInventario}/updateStock`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      libroId:libroId,
      sucursalId:sucursalId,
      autor:cantidad
    });

    console.log(urlactualizarInventario);

    return this.resp = this.http.put(urlactualizarInventario, body, options);
  }

}

