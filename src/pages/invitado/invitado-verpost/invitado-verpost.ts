import { SteemProvider } from './../../../providers/steem/steem';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import marked from 'marked';
import { SteemconnectProvider } from '../../../providers/steemconnect/steemconnect';
/**
 * Generated class for the InvitadoVerpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-invitado-verpost',
  templateUrl: 'invitado-verpost.html',
})
export class InvitadoVerpostPage {

  tags: any;
  @ViewChild(Content) content: Content;

  coments: any[];
  articulo: any = [];
  constructor(private _SteemProvider: SteemProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.articulo = this.navParams.get("post");
    this.toHtml();
    this.getComments();
    this.getTags();
  }

  toHtml() {
    this.content = marked(this.articulo.body);
  }


  getComments() {
    let x: Promise<any> = this._SteemProvider.GetContentReplies(this.articulo.author, this.articulo.permlink);
    x.then(response => {
      console.log(response);
      this.coments = response;
    });
  }

  getTags() {
    this.tags = JSON.parse(this.articulo.json_metadata).tags;
  }

}
