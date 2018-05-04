import { BloqueapiProvider } from './../../../providers/bloqueapi/bloqueapi';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { VerificarPostPage } from '../verificar-post/verificar-post';

@Component({
  selector: 'page-curar-post',
  templateUrl: 'curar-post.html'
})
export class CurarPostPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  articulos;
  constructor(public navCtrl: NavController,
    private _api: BloqueapiProvider,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    this.getArticulosPorEditar();
  }


  getArticulosPorEditar() {
    this._api.getPublicaciones().then(result => {
      this.articulos = result;
      console.log(result);

    }, err => {
      console.log(err);

      this.showAlert("error", "se produjo un erro al traer los resultados, intente nuevamente mas tarde");
    }).catch(exception => {
      console.log(exception);

      this.showAlert("error", "se produjo un erro al traer los resultados, intente nuevamente mas tarde");
    })

  }




  showAlert(tittle, subTitle) {
    let alert = this.alertCtrl.create({
      title: tittle,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  verPost(postId) {
    this.navCtrl.push(VerificarPostPage, { "postID": postId } );
  }

  doRefresh(refresher) {
    this.getArticulosPorEditar();
    refresher.complete();
  }

}
