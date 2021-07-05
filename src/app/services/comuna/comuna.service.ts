import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { Comuna } from '../../interfaces/comuna';

@Injectable({
  providedIn: 'root'
})

export class ComunaService {

  urlComuna:string = environment.apiComuna.toString();
  urlRegion:string = environment.apiComuna.toString();

  resp: Observable<any> | undefined;

  constructor( private http: HttpClient) { }

  getComunas(){

    const urlGetComunas = `${environment.apiHost.toString()}${this.urlComuna}/getallComunas`;
    console.log(urlGetComunas);

    return this.resp = this.http.get(urlGetComunas);
  }

  addComuna( comuna: Comuna){

    const urlAddComuna = `${environment.apiHost.toString()}${this.urlComuna}/addComuna`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      nombre: comuna.nombre,
      regionId: comuna.regionId
    });

    console.log(urlAddComuna);
    console.log(body);

    return this.resp = this.http.post(urlAddComuna, body, options);
  }

  updateComuna( comuna: Comuna){

    const urlUpdateComuna = `${environment.apiHost.toString()}${this.urlComuna}/updateComuna?id=${comuna.comunaId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      nombre: comuna.nombre,
      regionId: comuna.regionId
    });

    console.log(urlUpdateComuna);
    console.log(body);

    return this.resp = this.http.put(urlUpdateComuna, body, options);
  }

  deleteComuna( comuna: Comuna){

    const urlDeleteComuna = `${environment.apiHost.toString()}${this.urlComuna}/deleteComuna?id=${comuna.comunaId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    console.log(urlDeleteComuna);

    return this.resp = this.http.delete(urlDeleteComuna, options);
  }

  getRegiones(){

    const urlGetRegiones = `${environment.apiHost.toString()}${this.urlRegion}/getallRegiones`;
    console.log(urlGetRegiones);

    return this.resp = this.http.get(urlGetRegiones);
  }
}
