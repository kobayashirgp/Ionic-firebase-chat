import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BaseService } from '../base/base.service';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    public http: HttpClient) {
    super();
   
  }

  createAuthUser(user: { email: string, password: string }): Promise<firebase.User> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .catch(this.handlePromiseError);

  }
  signinWithEmail(user:{email:string,password:string}):Promise<boolean>{
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then((authUser: firebase.User) => {
        return authUser != null;
    }).catch(this.handlePromiseError);
  }
  logout():Promise<void>{
    return this.angularFireAuth.auth.signOut();
  }
  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth
        .authState
        .first()
        .subscribe((authUser: firebase.User) => {
          (authUser) ? resolve(true) : reject(false);
        });
    });
  }
}
