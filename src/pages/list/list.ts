import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Synop } from '../home/home.model';
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
  public entities: Synop[]

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, protected db: AngularFireDatabase) {

    let load = this.loadingCtrl.create({ content: 'Carregando...' });
    load.present();
    this.getAll();
    // this.getAll().subscribe(
    //   data => this.entities = data as Synop[]
    // );
    load.dismiss();

  }

  public getAll() {
    return this.db.list(this.PATH).subscribe(
        itens => (this.entities = itens)
      )
    }

  public view(data) {
    console.log(data);
  }

  launchView(data) {
    this.navCtrl.push(ViewPage, data);
  }

  launchEdit(data) {
    this.navCtrl.push(HomePage, data);
  }

}
