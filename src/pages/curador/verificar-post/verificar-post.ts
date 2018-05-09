import { BloqueapiProvider } from './../../../providers/bloqueapi/bloqueapi';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { LowerCasePipe } from '@angular/common';
import marked from 'marked';

@Component({
  selector: 'page-verificar-post',
  templateUrl: 'verificar-post.html'
})
export class VerificarPostPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  articulo: any = [];
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private _api: BloqueapiProvider,
    public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get("postID"));

    this.getArticulo(this.navParams.get("postID"));


  }

  toHtml() {
    this.content = marked(this.articulo.cuerpo);
  }

  getArticulo(id) {
    this._api.getPublicaciones(id).then(res => {
      console.log(res);
      this.articulo = res;
      this.toHtml();
    }, err => {
      console.log(err);

      this.showErrorAlert("error", " no se pudo traer esta publicacion");
    }).catch(exception => {
      console.log(exception);

      this.showErrorAlert("error", " no se pudo traer esta publicacion");
    });
  }




  showErrorAlert(tittle, subTitle) {
    let alert = this.alertCtrl.create({
      title: tittle,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.onDidDismiss(data => {
      this.navCtrl.pop();
    })
    alert.present();
  }


}
