import { ListDetailsPage } from '../list-details/list-details';
import { Observable } from 'rxjs/Rx';
import { Data } from './../synop.model';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Synop } from '../synop.model';
import { LoadingController } from 'ionic-angular';
import { ViewPage } from '../view/view';
import { HomePage } from '../home/home';

// @IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private PATH = '/synops/';
  public entities: Data[];
  public key = [];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, protected db: AngularFireDatabase) {  }

  public ionViewDidLoad() {
    let load = this.loadingCtrl.create({ content: 'Carregando...' });
    load.present();

    this.getAll().subscribe(
      data => {
        this.entities = data.reverse() as Data[];
        console.log(this.entities);
      }
    );
    load.dismiss();
  }

  public getAll() {
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, Synops: c.payload.val() }));
    })
}

  public launchView(data) {
    this.navCtrl.push(ListDetailsPage, data);
  }

  public launchAdd() {
    this.navCtrl.push(HomePage);
  }

}
