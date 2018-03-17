import { HomePage } from './../pages/home/home';
import { UserService } from './../providers/user/user.service';
import { User } from './../models/user.model';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from '../pages/signin/signin';
import { AuthService } from '../providers/auth/auth.service';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  currentUser:User;
  constructor(
    authService:AuthService,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    userService:UserService
  ) {
    authService.angularFireAuth.authState.subscribe((authUser: firebase.User) => {
      if (authUser) {
        this.rootPage = HomePage;
        userService.currentUser
          .valueChanges()
          .subscribe((user: User) => {
            this.currentUser = user;           
          });
      } else {
        this.rootPage = SigninPage;
      }

    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

