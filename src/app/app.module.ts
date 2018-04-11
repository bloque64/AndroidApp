import { HomePage } from './../pages/home/home';
import { Tab2Page } from './../pages/tab2/tab2';
import { Tab1Page } from './../pages/tab1/tab1';
import { TabsPage } from './../pages/tabs/tabs';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule  } from '@angular/http';
import { SteemProvider } from '../providers/steem/steem';
import { SteemconnectProvider } from '../providers/steemconnect/steemconnect';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    TabsPage,
    Tab1Page,
    Tab2Page,
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    TabsPage,
    Tab1Page,
    Tab2Page,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SteemProvider,
    SteemconnectProvider
  ]
})
export class AppModule { }
