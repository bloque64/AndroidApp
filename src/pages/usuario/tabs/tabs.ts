import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Tab1Page } from '../tab1/tab1';
import { Tab2Page } from '../tab2/tab2';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage
  tab1Root = Tab1Page
  tab2Root = Tab2Page


  constructor(public navCtrl: NavController) { }

}
