import { FIREBASE_CONFIG } from './firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ViewPage } from '../pages/view/view';
import { RegisterPage } from '../pages/register/register';
import { ListDetailsPage } from '../pages/list-details/list-details';
import { AboutPage } from './../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MaskInput } from 'mask-ioni-3/mask-input';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ChartsModule } from 'ng2-charts';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    MyApp,
    MaskInput,

    LoginPage,
    HomePage,
    ListPage,
    ViewPage,
    RegisterPage,
    ListDetailsPage,
    AboutPage
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ChartsModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    LoginPage,
    HomePage,
    ListPage,
    ViewPage,
    RegisterPage,
    ListDetailsPage,
    AboutPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
