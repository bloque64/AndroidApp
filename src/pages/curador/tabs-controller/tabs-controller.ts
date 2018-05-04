import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurarPostPage } from '../curar-post/curar-post';
import { RevisarPostPage } from '../revisar-post/revisar-post';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = CurarPostPage;
  tab2Root: any = RevisarPostPage;
  constructor(public navCtrl: NavController) {
  }
  
}
