import { SteemProvider } from './../../providers/steem/steem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private _steem: SteemProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this._steem.getDiscussionsByCreated(10).then(res => {
      console.log(res);

    }).catch(err => {
      console.log(err);

    });
  }

}
