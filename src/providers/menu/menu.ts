import { Injectable } from '@angular/core';
import { inject } from '@angular/core/src/render3';

/*
  Generated class for the MenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class MenuProvider {
  constructor() {
   
  }

  createCategorias(): Categoria[] {
    //opinion
    let categorias = [];
    categorias.push(new Categoria("Politica", []));
    categorias.push(new Categoria("Justicia", []));
    categorias.push(new Categoria("Economia", []));
    categorias.push(new Categoria("Deportes", []));
    categorias.push(new Categoria("Cultura", []));
    categorias.push(new Categoria("Tecnologia", []));
    categorias.push(new Categoria("Vida", []));
    categorias.push(new Categoria("Steem", []));
    //console.log(categorias)
    //console.log(new Categoria("Politica", []));
    
    return categorias;
  }

  getCategorias() {
    return this.createCategorias();
  }

}


export class Categoria {
  nombre;
  subcategoria
  constructor(nombre, subcategoria) {
    this.nombre = nombre;
    this.subcategoria = subcategoria;
  }

}