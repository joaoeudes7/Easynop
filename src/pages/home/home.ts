import { Data, Synop } from './../synop.model';
import { ListPage } from '../list/list';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data: Data; // key, Synops[]
  public synop: Synop;
  public _form: FormGroup;

  private PATH = '/synops/';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private db: AngularFireDatabase) {

    this.synop = new Synop();
    this.data = new Data();

    this.synop.data = new Date().toISOString().substr(0, 10);
    this.synop.hora = new Date().toUTCString().substr(17,8);

    this._form = this.formBuilder.group({
      data: [this.synop.data],
      hora: [this.synop.hora , Validators.required],

      // campo de identificação
      IdRegiao: [this.synop.IdRegiao , Validators.required],
      IdEstacao: [this.synop.IdEstacao , Validators.required],

      // campo Status do ambiente
      irlx: [this.synop.irlx , Validators.required],
      h: [this.synop.h , Validators.required],
      visibilidade: [this.synop.visibilidade , Validators.required], //%

      // Ceú e Vento (Nddff)
      N: [this.synop.N],
      dI: [this.synop.dI],
      dII: [this.synop.dII],
      fI: [this.synop.fI],
      fII: [this.synop.fII],


      // 1. Temperatura do ar (SnTTT)
      // 1
      SnI: [this.synop.SnI],
      TI: [this.synop.TI],
      TII: [this.synop.TII],
      TIII: [this.synop.TIII],

      // 2. Ponto de Orvalho (SnTdTdTd)
      // 2
      SnII: [this.synop.SnII],
      TdI: [this.synop.TdI],
      TdII: [this.synop.TdII],
      TdIII: [this.synop.TdIII],

      // Pressão atmosférica a nível da Estação (PoPoPo)
      PoI: [this.synop.PoI],
      PoII: [this.synop.PoII],
      PoIII: [this.synop.PoIII],
      PoIV: [this.synop.PoIV],


      // 4. Pressão atmosférica a nível da Mar (PPPP)
      // 4
      PI: [this.synop.PI],
      PII: [this.synop.PII],
      PIII: [this.synop.PIII],
      PIV: [this.synop.PIV],

      // 7. Fenômenos Observados: Tempo Passado/Presente
      tempPassado: [this.synop.tempPassado], // °
      tempPresente: [this.synop.tempPresente], // °

      // 8. Tipos de Nuvens (NhClChCn)
      nh: [this.synop.nh],
      cl: [this.synop.cl],
      ch: [this.synop.ch],
      cn: [this.synop.cn],
    });
  }

  ionViewDidLoad() {
    if(this.navParams.data.key) {
      this.synop = this.navParams.data as Synop;
      this.data.key = this.synop.data + '/';
    }
  }

  public onSubmit() {
    this.synop.key = this.synop.hora;
    this.synop.generateSynopString();

    this.PATH += this.data.key + this.synop.key;
    new Promise((resolve, reject) => {
      if (this.data.key) {
        this.db.object(this.PATH)
          .update(this.synop)
          .then(() => { resolve(); })
          .catch((e) => { reject(e); });
      } else {
        this.db.object(this.PATH)
          .set(this.synop)
          .then(() => { resolve(); });
      }
    })

    this.navCtrl.push(ListPage);
  }

  clear() {
    console.log(this._form.value);
  }

  onDelete() {
    const PATH =  '/synops/' + this.synop.data;
    this.db.list(PATH).remove(this.synop.key);

    let toast = this.toastCtrl.create({
      message: 'Removido!',
      duration: 3000
    });
    toast.present();
    this.navCtrl.setRoot(ListPage);
  }

}
