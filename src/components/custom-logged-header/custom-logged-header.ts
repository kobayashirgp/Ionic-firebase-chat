import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AuthService } from './../../providers/auth/auth.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { App } from 'ionic-angular';
import { User } from '../../models/user.model';

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent{

@Input() title:string;
@Input() user :User;
  constructor(
    public alertCtrl: AlertController,
    public authCtrl: AuthService,
    public app :App,
    public menuCrtl:MenuController) {
   super(alertCtrl,authCtrl,app,menuCrtl);
  }

}
