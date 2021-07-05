import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { Sucursal } from '../../interfaces/sucursal';

@Injectable({
  providedIn: 'root'
})

export class SucursalService {

  urlSucursal:string = environment.apiSucursal.toString();
  urlComuna:string = environment.apiComuna.toString();

  resp: Observable<any> | undefined;

  constructor( private http: HttpClient) { }

  getSucursales(){

    const urlGetSucursales= `${environment.apiHost.toString()}${this.urlSucursal}/getAllSucursales`;
    console.log(urlGetSucursales);

    return this.resp = this.http.get(urlGetSucursales);
  }

  
  addSucursal( sucursal: Sucursal){

    const urlAddSucursal = `${environment.apiHost.toString()}${this.urlSucursal}/addSucursal`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      encargado: sucursal.encargado,
      comunaId: sucursal.comunaId
    });

    console.log(urlAddSucursal);
    console.log(body);

    return this.resp = this.http.post(urlAddSucursal, body, options);
  }

  updateSucursal( sucursal: Sucursal){

    const urlUpdateSucursal = `${environment.apiHost.toString()}${this.urlSucursal}/updateSucursal?id=${sucursal.sucursalId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      encargado: sucursal.encargado,
      comunaId: sucursal.comunaId
    });

    console.log(urlUpdateSucursal);
    console.log(body);

    return this.resp = this.http.put(urlUpdateSucursal, body, options);
  }

  deleteSucursal( sucursal: Sucursal){

    const urlDeleteSucursal = `${environment.apiHost.toString()}${this.urlSucursal}/deleteSucursal?id=${sucursal.sucursalId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    console.log(urlDeleteSucursal);

    return this.resp = this.http.delete(urlDeleteSucursal, options);
  }

}
