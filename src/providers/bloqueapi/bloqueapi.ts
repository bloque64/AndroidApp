import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BloqueapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BloqueapiProvider {

  constructor(public http: HttpClient) {

  }

  getTipoUsuario(): Promise<any> {
    return this.peticionGet("");
  }

  getPublicaciones(id?): Promise<any> {
    if (id !== undefined) {
      console.log("http://127.0.0.1:8000/publicaciones" + "/" + id);

      return this.peticionGet("http://127.0.0.1:8000/publicaciones" + "/" + id);
      // argument passed and not undefined
    } else {
      return this.peticionGet("http://127.0.0.1:8000/publicaciones");
      // argument not passed or undefined
    }

  }

  publicar(): Promise<any> {
    return this.peticionPost("", "");
  }

  enviarARevision(): Promise<any> {
    return this.peticionPost("", "");
  }

  curar(): Promise<any> {
    return this.peticionPut("", "");
  }


  peticionGet(url): Promise<any> {

    const __this = this;
    return new Promise(function (resolve, reject) {
      __this.http.get(url).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  peticionPost(url, body): Promise<any> {
    const __this = this;
    return new Promise(function (resolve, reject) {

      __this.http.post(url, body).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  peticionPut(url, body): Promise<any> {
    const __this = this;
    return new Promise(function (resolve, reject) {
      __this.http.put(url, body).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

}
