import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { User } from '../../models/user.model';
import { BaseService } from '../base/base.service';
import 'firebase/storage';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { UploadTask } from '@firebase/storage-types';
@Injectable()
export class UserService extends BaseService {

  users: Observable<any>;
  currentUser: AngularFireObject<User>;

  constructor(
    public firebaseApp: FirebaseApp,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public http: Http
  ) {
    super();
    this.users = this.af.list(`/users`).valueChanges();
    this.listenAuthState();
  }
  private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          this.currentUser = this.af.object(`/users/${authUser.uid}`);         
          this.setUsers(authUser.uid);
        }
      });
  }
  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.af.list<User>(`/users`, 
        (ref: firebase.database.Reference) => ref.orderByChild('name')
      )
    )
    .map((users: User[]) => {      
      return users.filter((user: User) => user.$key !== uidToExclude);
    });
  }
  create(user: User, uuid: string): Promise<void> {

    return this.af.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }
  edit(user:{name:string,username:string,photo:string}):Promise<void>{
    return this.currentUser.update(user).catch(this.handlePromiseError);

  }
  userExists(username: string): Observable<boolean> {
    return this.af.list(`/users`,
      (ref: firebase.database.Reference) => ref.orderByChild('name').equalTo(username))
      .valueChanges()
      .map((users: User[]) => {
        return users.length > 0;
      }).catch(this.handleObservableError);
  }
  get(userId: string): AngularFireObject<User> {
       return this.af.object<User>(`/users/${userId}`);
  }
  uploadPhoto(file: File, userId: string): UploadTask{
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/users/${userId}`)
      .put(file);
  }
}