import { SteemProvider } from './../../../providers/steem/steem';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import marked from 'marked';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  articulos: any = [];
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private _steem: SteemProvider) {
  }

  ionViewDidLoad() {
    this.load();

  }

  load() {
    let loader = this.loadingCtrl.create({
      content: "Cargando articulos"
    });
    loader.present();
    this._steem.getDiscussionsByCreated(10).then(res => {
      this.articulos = res;
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

}
