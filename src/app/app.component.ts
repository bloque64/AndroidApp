import { Tab1Page } from './../pages/usuario/tab1/tab1';
import { TabsControllerPage } from './../pages/curador/tabs-controller/tabs-controller';
import { Categoria, MenuProvider } from './../providers/menu/menu';
import { InvitadoVerpostPage } from './../pages/invitado/invitado-verpost/invitado-verpost';
import { InvitadoHomePage } from './../pages/invitado/invitado-home/invitado-home';
import { AboutPage } from './../pages/about/about';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { PersonalloginPage } from '../pages/personallogin/personallogin';
import { TabsPage } from '../pages/usuario/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = Tab1Page;
  logincheck = false;

  menu: Categoria[] = [];
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _MenuProvider: MenuProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.login();
      this.menu = _MenuProvider.getCategorias();
      console.log(this.menu);
    });
  }
  login() {
    if (localStorage.getItem('dataccess')) {
      this.rootPage = TabsPage;
    }else{
      return false;
    }
  }
  logear() {
    this.login();
    this.rootPage = LoginPage;
  }
  about() {
    this.login();
    this.rootPage = AboutPage;
  }


}

