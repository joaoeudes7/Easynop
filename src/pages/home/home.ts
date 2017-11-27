import { ListPage } from '../list/list';
import { Component } from '@angular/core';

import { Pressao, Synop, Tipos } from './home.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public entity: Synop;
  public _form: FormGroup;

  private PATH = '/synops/';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public formBuilder: FormBuilder,
              private db: AngularFireDatabase) {

    this.entity = new Synop();

    this.entity = navParams.data;
    console.log(this.entity);

    this.entity.data = new Date().toISOString();
    this.entity.hora = new Date().toTimeString().substr(0, 8);

    this.entity.tiposNuvens = new Tipos();
    this.entity.pressao = new Pressao();

    this._form = this.formBuilder.group({
      hora: [this.entity.hora, Validators.required],
      data: [this.entity.data, Validators.required],
      periodo: [this.entity.periodo, Validators.required],
      chuvaStatus: [this.entity.chuvaStatus],
      qtdChuva: [this.entity.qtdChuva],
      tempPassado: [this.entity.tempPassado],
      tempPresente: [this.entity.tempPresente],
      alturaNuvens: [this.entity.alturaNuvens],
      visibilidade: [this.entity.visibilidade],
      qtdNuvens: [this.entity.qtdNuvens],
      direcaoNuvens: [this.entity.direcaoNuvens],
      direcaoVento: [this.entity.direcaoVento],
      tempAmbiente: [this.entity.tempAmbiente],
      pontoOrvalho: [this.entity.pontoOrvalho],
      pressaoAtmosferica: [this.entity.pressaoAtmosferica],
      neboluzidade: [this.entity.neboluzidade],
      nh: [this.entity.tiposNuvens.nh],
      cl: [this.entity.tiposNuvens.cl],
      cn: [this.entity.tiposNuvens.cn],
      ch: [this.entity.tiposNuvens.ch],
      tempMax: [this.entity.tempMax],
      tempMin: [this.entity.tempMin],
      humidade: [this.entity.humidade],
      insolacao: [this.entity.insolacao],
      n1: [this.entity.pressao.n1],
      n2: [this.entity.pressao.n2],
      n3: [this.entity.pressao.n3],
      n4: [this.entity.pressao.n4],
    });
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    return new Promise((resolve, reject) => {
      if (this.entity.key) {
        this.db.list(this.PATH)
          .update(this.entity.key, this.entity)
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push(this.entity)
          .then(() => resolve());
      }

      let toast = this.toastCtrl.create({
        message: 'Feito! :)',
        duration: 3000
      });

      toast.present();
      this.navCtrl.push(ListPage);
    })
  }

  onDelete() {
      this.db.list(this.PATH).remove(this.entity.key);

      let toast = this.toastCtrl.create({
        message: 'Removido!',
        duration: 3000
      });
      toast.present();
      this.navCtrl.setRoot(ListPage);
  }

}
