import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ListPage } from './../list/list';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './User.model';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {

  public user = {} as User;
  public _form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth: AngularFireAuth,
    private toast: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder
  ) {

    this._form = this.formBuilder.group({
      email: [this.user.email, [Validators.minLength(5), Validators.maxLength(30)]],
      password: [this.user.password, [Validators.minLength(7), Validators.maxLength(25)]]
    });
  }

  ionViewDidLoad() {

    this.AFauth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Bem-vindo, ${data.email}!`,
          duration: 3000
        }).present();
        this.navCtrl.setRoot(ListPage);
      }
    });

}

  public async login(user: User) {
    let load = this.loadingCtrl.create({ content: 'Carregando...' });
    load.present();

    try {
      const result = await this.AFauth.auth.signInWithEmailAndPassword(user.email, user.password);
      load.dismiss();

      if (result) {
        this.toast.create({
          message: 'Bem-vindo!',
          duration: 3000
        }).present();
        this.navCtrl.setRoot(ListPage);
      }
    }
    catch (e) {
      console.error(e);
      load.dismiss();

      this.toast.create({
        message: e['code'],
        duration: 3000
      }).present();

    }
  }

  // public async login(user: User) {
  //   let load = this.loadingCtrl.create({ content: 'Carregando...' });
  //   load.present();

  //   this.AFauth.auth.signInWithEmailAndPassword(user.email, user.password);
  //   this.AFauth.authState.subscribe(data => {
  //     if (data.email && data.uid) {
  //       this.toast.create({
  //         message: 'Bem-vindo, ${data.email}!',
  //         duration: 3000
  //       }).present();
  //       this.navCtrl.setRoot(ListPage);
  //     } else {
  //       this.toast.create({
  //         message: 'Falha no Login!',
  //         duration: 3000
  //       }).present();

  //     }
  //   })

  //   load.dismiss();

  // }

  public register() {
    this.navCtrl.push(RegisterPage);
  }


}
