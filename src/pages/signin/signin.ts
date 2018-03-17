import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth/auth.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;
  constructor( 
    public alertCtrl : AlertController,
    public loadingCtrl : LoadingController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    let regexEmail = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(regexEmail)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  
  onSubmit():void{
    let load = this.showLoading();
     this.authService.signinWithEmail(this.signinForm.value)
     .then((logado : boolean)=>{
        if(logado){
          this.navCtrl.setRoot(HomePage);
          load.dismiss();
        }
     }).catch((error: any) => {
      console.log(error);
      load.dismiss();
      this.showAlert(error);

    });;
      
  }
  onSignup():void{
    this.navCtrl.push(SignupPage);
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
