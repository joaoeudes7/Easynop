import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Synop } from '../home/home.model';
import { LoadingController } from 'ionic-angular';

// @IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage {
  public entities: Synop[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, protected db: AngularFireDatabase) {

    this.entities = navParams.data;
    console.log(this.entities);

  }

  public view(data) {
    console.log(data);
  }

}
