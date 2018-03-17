import { ChatService } from './../../providers/chat/chat.service';
import { Chat } from './../../models/chat.model';
import { Observable } from 'rxjs/Observable';
import { MessageService } from './../../providers/message/message.service';
import { Message } from './../../models/message.model';
import { AngularFireList, AngularFireObject } from 'angularfire2/database';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth/auth.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user/user.service';
import * as firebase from 'firebase/app';
import { Content } from 'ionic-angular/components/content/content';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  messages: AngularFireList<Message>;
  viewMessages: Observable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;
  private chat1: AngularFireObject<Chat>;
  private chat2: AngularFireObject<Chat>;

  constructor(
    public chatService: ChatService,
    public messageService: MessageService,
    public userService: UserService,
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;


    let doSubscription = () => {
      this.viewMessages = this.messageService.mapListKeys<Message>(this.messages);
      this.viewMessages
        .subscribe((messages: Message[]) => {
          this.scrollToBottom();
        });
    }


    this.userService.mapObjectKey<User>(this.userService.currentUser).first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;

        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);
       
        if(this.recipient.photo){
          this.chatService
            .mapObjectKey(this.chat1)
            .first()
            .subscribe((chat: Chat) => {
              this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
            });
         }
        this.messages = this.messageService.getMessages(this.sender.$key, this.recipient.$key);

        this.messages
          .valueChanges()
          .first()
          .subscribe((messages: Message[]) => {

            if (messages.length === 0) {
              this.messages = this.messageService.getMessages(this.recipient.$key, this.sender.$key);
            }
            doSubscription();
          });


      });
  }
  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }
  sendMessage(newMessage: string): void {
    if (newMessage) {
      let timestampAtual: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService.create(
        new Message(
          this.sender.$key,
          newMessage,
          timestampAtual
        ),
        this.messages
      ).then(() => {
        this.chat1.update({
          lastMessage: newMessage,
          timestamp: timestampAtual,
        });
        this.chat2.update({
          lastMessage: newMessage,
          timestamp: timestampAtual,
        });
      })

    }
  }
  private scrollToBottom(duration?: number): void {

    setTimeout(() => {
      if (this.content._scroll) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50);

  }

}
