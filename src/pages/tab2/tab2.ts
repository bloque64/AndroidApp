import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SteemconnectProvider } from '../../providers/steemconnect/steemconnect';
import * as steem from 'steem';
/**
 * Generated class for the Tab2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {


  me;
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams,
    private _SteemconnectProvider: SteemconnectProvider) {
  }

  ionViewDidLoad() {
    this.load();
  }

  showAlert(tittle, subTitle) {
    let alert = this.alertCtrl.create({
      title: tittle,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  load() {
    let loader = this.loadingCtrl.create({
      content: "Cargando"
    });
    loader.present();
    this._SteemconnectProvider.Getuserprofile().then(res => {
      this.me = res;

      loader.dismiss();
    }).catch(err => {
      loader.dismiss();

      this.showAlert('Error', 'Se produjo un error al traer tu informacion, intenta nuevamente mas tarde');

    });
  }

  formatJsonMetadata(json_metadata) {
    return JSON.parse(json_metadata);
  }

  formatReputation(reputation) {
    return steem.formatter.reputation(reputation);
  }

  getimg() {
    return JSON.parse(this.me.account.json_metadata).profile.cover_image;
  }

  getProfileImage(){
    return JSON.parse(this.me.account.json_metadata).profile.profile_image
  }

}
