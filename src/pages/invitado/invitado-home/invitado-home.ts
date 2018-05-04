import { InvitadoVerpostPage } from './../invitado-verpost/invitado-verpost';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { SteemProvider } from '../../../providers/steem/steem';
import marked from 'marked';
/**
 * Generated class for the InvitadoHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-invitado-home',
  templateUrl: 'invitado-home.html',
})
export class InvitadoHomePage {

  articulos: any = [];
  constructor(public _MenuController: MenuController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private _steem: SteemProvider) {
  }

  ionViewDidLoad() {
    this.load();
    this._MenuController.enable(true, 'acciones');
    this._MenuController.enable(true, 'categorias');
  }

  load() {
    let loader = this.loadingCtrl.create({
      content: "Cargando articulos"
    });
    loader.present();
    this._steem.getDiscussionsByCreated(10).then(res => {
      this.articulos = res;
      console.log(this.articulos);
      
      loader.dismiss();
    }).catch(err => {
      loader.dismiss();

      this.showAlert('Error', 'Se produjo un error al traer los articulos, intenta nuevamente mas tarde');
    });
  }


  showAlert(tittle, subTitle) {
    let alert = this.alertCtrl.create({
      title: tittle,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  formatBody(body) {

    const html = marked(body);
    const plaintext = String(html).replace(/<[^>]+>/gm, '');
    return plaintext.substring(0, 150);
  }

  returnImg(json_metadata) {
    return JSON.parse(json_metadata).image[0];
  }

  doRefresh(refresher) {
    this.load();
    refresher.complete();
  }


  ver(articulo) {
    this.navCtrl.push(InvitadoVerpostPage, { post: articulo });
  }


}
