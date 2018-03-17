import { ProgressBarComponent } from './../components/progress-bar/progress-bar';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserInfoComponent } from './../components/user-info/user-info';
import { MessageBoxComponent } from './../components/message-box/message-box';
import { MessageService } from './../providers/message/message.service';
import { SigninPage } from './../pages/signin/signin';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { UserService } from '../providers/user/user.service';
import { AuthService} from '../providers/auth/auth.service';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header';
import { CapitalizePipe } from '../pipes/capitalize/capitalize';
import { ChatPage } from '../pages/chat/chat';
import { ChatService } from '../providers/chat/chat.service';
import { UserMenuComponent } from '../components/user-menu/user-menu';

 
const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBz5RR-bKZsruSDpwIVO-qKaLG42bLPt0o",
  authDomain: "ionic2-firebase-chat-a4868.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-a4868.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-a4868.appspot.com",
  messagingSenderId: "575375888456"
 };
 
@NgModule({
 declarations: [
     MyApp,
     HomePage,
     SignupPage,
     SigninPage,
     CapitalizePipe,
     CustomLoggedHeaderComponent,
     MessageBoxComponent,
     ChatPage,
     UserInfoComponent,
     UserMenuComponent,
     ProgressBarComponent,
     UserProfilePage
     
 ],
 imports: [
     AngularFireModule.initializeApp(firebaseAppConfig),
     AngularFireDatabaseModule,
     AngularFireAuthModule,
     BrowserModule,
     HttpModule,
     HttpClientModule,
     IonicModule.forRoot(MyApp,{
        mode: 'ios'
     })
 ],
 bootstrap: [IonicApp],
 entryComponents: [
     MyApp,
     HomePage,
     SignupPage,
     SigninPage,
     ChatPage,
     UserProfilePage
 ],
 providers: [
     StatusBar,
     SplashScreen,
     HttpClientModule,
     {provide: ErrorHandler, useClass: IonicErrorHandler},
     UserService,
    AuthService,
    ChatService,
    MessageService
 ]
})
export class AppModule {}
