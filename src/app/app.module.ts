import { PersonalloginPage } from './../pages/personallogin/personallogin';
// invitado
import { InvitadoHomePage } from './../pages/invitado/invitado-home/invitado-home';

// curador
import { CurarPostPage } from './../pages/curador/curar-post/curar-post';
import { VerificarPostPage } from './../pages/curador/verificar-post/verificar-post';
import { TabsControllerPage } from './../pages/curador/tabs-controller/tabs-controller';
import { RevisarPostPage } from './../pages/curador/revisar-post/revisar-post';
// usuario
import { HomePage } from './../pages/usuario/home/home';
import { Tab2Page } from './../pages/usuario/tab2/tab2';
import { Tab1Page } from './../pages/usuario/tab1/tab1';
import { TabsPage } from './../pages/usuario/tabs/tabs';

import { LoginPage } from './../pages/login/login';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { SteemProvider } from '../providers/steem/steem';
import { SteemconnectProvider } from '../providers/steemconnect/steemconnect';
import { HttpClientModule } from '@angular/common/http';
import { Toast } from '@ionic-native/toast';
import { BloqueapiProvider } from '../providers/bloqueapi/bloqueapi';
import { InvitadoVerpostPage } from '../pages/invitado/invitado-verpost/invitado-verpost';
import { MenuProvider } from '../providers/menu/menu';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    Tab1Page,
    Tab2Page,
    CurarPostPage,
    RevisarPostPage,
    TabsControllerPage,
    VerificarPostPage,
    InvitadoHomePage,
    PersonalloginPage,
    InvitadoVerpostPage
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
    TabsPage,
    Tab1Page,
    Tab2Page,
    CurarPostPage,
    RevisarPostPage,
    TabsControllerPage,
    VerificarPostPage,
    InvitadoHomePage,
    PersonalloginPage,
    InvitadoVerpostPage
  ],
  providers: [
    Toast,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SteemProvider,
    SteemconnectProvider,
    BloqueapiProvider,
    MenuProvider
  ]
})
export class AppModule { }
