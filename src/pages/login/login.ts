import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as steemconnect from 'steemconnect';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  message: string;
  url: string;


  constructor(public navCtrl: NavController) {

    steemconnect.init({
      baseURL: 'https://steemconnect.com',
      app: 'bloque64',
      callbackURL: 'http://localhost:8100'
    });

    this.url = steemconnect.getLoginURL();

    steemconnect.isAuthenticated((err, result) => {
      console.log(err, result);

      if (err) {
        this.message = err;
      } else {
        this.message = `Logged in as ${result.username}`;
      }
    });

  }

}
