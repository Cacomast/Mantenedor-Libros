import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ParametroService {

  urlParametro:string = environment.apiParametro.toString();

  resp: Observable<any> | undefined;

  constructor( private http: HttpClient) { }

  getParametro(parametroId: number){

    const urlGetParametro= `${environment.apiHost.toString()}${this.urlParametro}/getallParametros?id=${parametroId}`;
    console.log(urlGetParametro);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });

      const options = {headers: headers}

    return this.resp = this.http.get(urlGetParametro, options);
  }

}


