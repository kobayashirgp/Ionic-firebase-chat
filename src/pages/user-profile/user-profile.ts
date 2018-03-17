import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;
  uploadProgress:number;
  private filePhoto: File;
  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public alertCtrl: AlertController
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }
  ionViewDidLoad() {
 
    this.userService.mapObjectKey<User>(this.userService.currentUser)
    .subscribe((user:User)=>{
      this.currentUser = user;
    });
  }
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.filePhoto) {
     
      let uploadTask = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);
      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {

        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      }, (error: Error) => {
        this.alertCtrl.create({
          message: error.name + ' ' + error.message, 
          buttons:[{
            text:'Ok'
        }]
        }).present();
      }, () => {
          this.editUser(uploadTask.snapshot.downloadURL);
      })
    }
    else {
      this.editUser();
    }

  }
  onPhoto(event): void {
    this.filePhoto = event.target.files[0];
  }
  private editUser(photoUrl?: string): void {
    this.userService.edit({
      name: this.currentUser.name,
      username: this.currentUser.username,
      photo: photoUrl || this.currentUser.photo || ''
    }).then(() => {
      this.canEdit = false;
      this.filePhoto = undefined;
      this.uploadProgress = 0;
    });
  }
}
