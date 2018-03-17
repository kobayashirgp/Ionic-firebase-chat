import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { Component } from '@angular/core';
import {  NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;


  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {

    let regexEmail = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(regexEmail)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let userName: string = formUser.username;

    this.userService.userExists(userName)
      .first()
      .subscribe((existe: boolean) => {
        if (!existe) {
          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authUser: firebase.User) => {
            delete formUser.password;
 
            let uuid :string = authUser.uid;
            this.userService.create(formUser,uuid).then(() => {
              console.log('Usuario cadastrado com sucesso');
              this.navCtrl.setRoot(HomePage);
              loading.dismiss();
            }).catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error);

            });
          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);

          });
        } else {
          this.showAlert(`O username ${userName} já existe.`);
          loading.dismiss();
        }
      });



  }
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please Wait'
    });
    loading.present();
    return loading;
  }
  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }
}
