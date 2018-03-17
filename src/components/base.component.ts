import { AuthService } from './../providers/auth/auth.service';
import { NavController, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SigninPage } from '../pages/signin/signin';
export abstract class BaseComponent implements OnInit{
   

    protected navCtrl : NavController;

    constructor(
        public alertCtrl: AlertController,
        public authCtrl: AuthService,
        public app :App,
        public menuCrtl:MenuController){
        
    }
    ngOnInit(): void {
        this.navCtrl = this.app.getActiveNavs()[0];

    }
    onLogout():void{
        this.alertCtrl.create({
            message:'Quit?',
            buttons:[{
                text:'Yes',
                handler: ()=>{
                    this.authCtrl.logout()
                    .then(()=>{
                        this.navCtrl.setRoot(SigninPage)
                        this.menuCrtl.enable(false,'user-menu');
                    }).catch((error)=>{console.log(error)})}
            },{
                text:'No'
            }]
        }).present();
    }
}
