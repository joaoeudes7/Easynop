import { LoginPage } from './../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../login/User.model';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validator, Validators } from "@angular/forms";
import { normalizeAsyncValidator } from "@angular/forms/src/directives/normalize_validator";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {

  public user = {} as User;
  public _form: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth: AngularFireAuth,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    public loadingCtrl: LoadingController) {

    this.user = new User();

    this._form = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{3,}\\b')]],
      password: [this.user.password, [Validators.required, Validators.minLength(8)]],
      rPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, this.passwordMatchValidator);

  }

  public passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : { 'mismatch': true };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public async register(user: User) {
    let load = this.loadingCtrl.create({ content: 'Carregando...' });
    load.present();

    try {
      const result = await this.AFauth.auth.createUserWithEmailAndPassword(user.email, user.password);
      load.dismiss();

      if (result) {
        this.toast.create({
          message: 'Agora já pode fazer login! :)',
          duration: 3000
        }).present();
        this.navCtrl.setRoot(LoginPage);
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
}
