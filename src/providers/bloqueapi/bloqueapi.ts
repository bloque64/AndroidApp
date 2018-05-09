import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BloqueapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BloqueapiProvider {


  url: string = "http://192.168.0.17:8000";

  constructor(public http: HttpClient) {

  }

  getTipoUsuario(): Promise<any> {
    return this.peticionGet("");
  }

  getPublicaciones(id?): Promise<any> {
    if (id !== undefined) {

      return this.peticionGet(this.url + "/publicaciones" + "/" + id);
      // argument passed and not undefined
    } else {
      return this.peticionGet(this.url + "/publicaciones/");
      // argument not passed or undefined
    }

  }

  getSteemPublicaciones(id?): Promise<any> {
    if (id !== undefined) {

      return this.peticionGet(this.url + "/steemit" + "/" + id);
      // argument passed and not undefined
    } else {
      return this.peticionGet(this.url + "/steemit");
      // argument not passed or undefined
    }

  }

  publicar(): Promise<any> {
    return this.peticionPost(this.url + "/publicaciones/", "");
  }

  enviarARevision(revision): Promise<any> {
    return this.peticionPost(this.url + "/publicaciones/", revision);
  }

  curar(): Promise<any> {
    return this.peticionPut("", "");
  }
  revisar(): Promise<any> {
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
