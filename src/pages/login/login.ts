import { SteemconnectProvider } from './../../providers/steemconnect/steemconnect';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../usuario/tabs/tabs';
declare var window: any;


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  message: string;

  constructor(public navCtrl: NavController,
    public alertCtrl:AlertController, private api: SteemconnectProvider) {
    if (localStorage.getItem('dataccess')) {
      this.navCtrl.setRoot(TabsPage);
    }
  }


  private LoginSteemConnect(): Promise<any> {
    const url = this.api.getLoginURL();
    return new Promise(function (resolve, reject) {
      const browserRef = window.cordova.InAppBrowser.open(url);
      browserRef.addEventListener("loadstart", (event) => {

        if ((event.url).indexOf("http://localhost:8100") === 0) {
          browserRef.removeEventListener("exit", (event) => { });
          browserRef.close();

          const url = new URL(event.url);
          const access_token = url.searchParams.get("access_token");
          const expires_in = url.searchParams.get("expires_in");
          const username = url.searchParams.get("username");

          var parsedResponse = {
            access_token: access_token,
            expires_in: expires_in,
            username: username
          };

          if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
            resolve(parsedResponse);
          } else {
            reject("Problem authenticating with steemconnect");
          }
        }
      });
      browserRef.addEventListener("exit", function (event) {
        reject("The steemconnect sign in flow was canceled");
      });
    });
  }

  /**
   * Iniciar Sesion
   */
  public login() {

    this.LoginSteemConnect().then(res => {
      localStorage.setItem('dataccess', JSON.stringify(res));
      this.api.setAccessToken(res.access_token);
      this.navCtrl.setRoot(TabsPage);
    }).catch(err => {
      console.log(err);

      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "ocurrio un error al inciar sesion, intenta nuevamente",
        buttons: ['OK']
      });
      alert.present();

    });

  }



}
