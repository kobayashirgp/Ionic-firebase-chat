import { UserProfilePage } from './../../pages/user-profile/user-profile';
import { User } from './../../models/user.model';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AuthService } from './../../providers/auth/auth.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { App } from 'ionic-angular';


@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User;
  constructor(
    public alertCtrl: AlertController,
    public authCtrl: AuthService,
    public app: App,
    public menuCrtl: MenuController) {
    super(alertCtrl, authCtrl, app, menuCrtl);
  }
  onProfile(): void {
    this.navCtrl.push(UserProfilePage);
  }
}
