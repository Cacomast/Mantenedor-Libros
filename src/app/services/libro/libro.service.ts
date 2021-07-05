import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { Libro } from '../../interfaces/libro';

@Injectable({
  providedIn: 'root'
})

export class LibroService {

  urlLibro:string = environment.apiLibro.toString();

  resp: Observable<any> | undefined;

  constructor( private http: HttpClient) { }

  getLibros(){

    const urlGetLibros= `${environment.apiHost.toString()}${this.urlLibro}/getAllLibros`;
    console.log(urlGetLibros);

    return this.resp = this.http.get(urlGetLibros);
  }

  
  addLibro( libro: Libro){

    const urlAddLibro = `${environment.apiHost.toString()}${this.urlLibro}/addLibro`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      isbn:libro.isbn,
      titulo:libro.titulo,
      autor:libro.autor,
      editorial:libro.editorial,
      annio:libro.annio,
      tapa:libro.tapa,
      precio:libro.precio
    });

    console.log(urlAddLibro);
    console.log(body);

    return this.resp = this.http.post(urlAddLibro, body, options);
  }

  updateLibro( libro: Libro){

    const urlUpdateLibro = `${environment.apiHost.toString()}${this.urlLibro}/updateLibro?id=${libro.libroId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    const body = JSON.stringify({
      isbn:libro.isbn,
      titulo:libro.titulo,
      autor:libro.autor,
      editorial:libro.editorial,
      annio:libro.annio,
      tapa:libro.tapa,
      precio:libro.precio
    });

    console.log(urlUpdateLibro);
    console.log(body);

    return this.resp = this.http.put(urlUpdateLibro, body, options);
  }

  deleteLibro( libro: Libro){

    const urlDeleteLibro = `${environment.apiHost.toString()}${this.urlLibro}/deleteLibro?id=${libro.libroId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

    const options = {headers: headers}

    console.log(urlDeleteLibro);

    return this.resp = this.http.delete(urlDeleteLibro, options);
  }

}

