import { Message } from './../../models/message.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { BaseService } from '../base/base.service';
@Injectable()
export class MessageService  extends BaseService {

  constructor(
    public db: AngularFireDatabase,  
    public http: HttpClient) { super()}
  
  create(message: Message, listMessages: AngularFireList<Message>): Promise<void> {
    return Promise.resolve(listMessages.push(message)).catch(this.handlePromiseError);
  }
  getMessages(userId1: string, userId2: string): AngularFireList<Message> {    
   
        return this.db.list(`/messages/${userId1}-${userId2}`, 
          (ref: firebase.database.Reference) => ref.limitToLast(30).orderByChild('timestamp')
        );
  }
}
