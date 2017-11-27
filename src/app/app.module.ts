import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ViewPage } from '../pages/view/view';

import { MaskInput } from 'mask-ioni-3/mask-input';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    ViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCIUNnhEMlCc5TQkBe9SeL1LQBdOhHMytI",
      authDomain: "easy-1a3c5.firebaseapp.com",
      databaseURL: "https://easy-1a3c5.firebaseio.com",
      projectId: "easy-1a3c5",
      storageBucket: "easy-1a3c5.appspot.com",
      messagingSenderId: "453232906151"
    }),
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    LoginPage,
    HomePage,
    ListPage,
    ViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
