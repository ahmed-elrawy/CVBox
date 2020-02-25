import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { Message } from "../classes/message";
import { ChatHead } from "../classes/chat_head";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  list: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  chatHeadId: string = "";

  messagesCollection: AngularFirestoreCollection<Message>
  messages: Observable<Message[]>

  allMessagesCollection: AngularFirestoreCollection<Message>
  allMessages: Observable<Message[]>

  chatHeadCollection: AngularFirestoreCollection<ChatHead>
  chatHead: Observable<ChatHead[]>



  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) { }



  fun2(senderId, receiverId) {
    let secondtID = this.fun(senderId.toLowerCase());
    let firstID = this.fun(receiverId.toLowerCase());

    let sum = secondtID * firstID;

    this.chatHeadId = "" + sum;
    this.getChat()
    this.getchatHeads(secondtID)
  }

  fun(id: string): number {

    let count: number = 1;


    for (let i = 0; i < id.length; i++) {
      let index = this.list.indexOf(id.charAt(i));

      if (index > 0) {
        count *= index;
      }
    }

    return count;
  }
  getChat() {

    this.messagesCollection = this.afs.collection(`messages`, ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('chat_id', '==', this.chatHeadId)

    });
    this.messages = this.messagesCollection.valueChanges();

  }

  getchatHeads(senderId) {

    this.chatHeadCollection = this.afs.collection('chat_head', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('users', 'array-contains', senderId)

    });
    this.chatHead = this.chatHeadCollection.valueChanges();


  }

  getMessages(chatHeadId) {

    this.allMessagesCollection = this.afs.collection('messages', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('chat_head_id', '==', chatHeadId)

    });
    this.allMessages = this.allMessagesCollection.valueChanges();


  }


  sendMessage(newMsg, senderId, receiverId) {
    let messageId = "" + new Date().getTime();
    const userRef: AngularFirestoreDocument<Message> = this.afs.doc(`messages/${messageId}`);
    let createdAt = firebase.firestore.FieldValue.serverTimestamp()
    // this.scrollBottom();
    const updatedMessage: Message = {
      created_at: createdAt,
      message: newMsg,
      sender_id: senderId.user_id.toLowerCase(),
      reciver_id: receiverId.user_id.toLowerCase(),
      chat_head_id: this.chatHeadId,
      message_id: messageId
    }

    userRef.set(updatedMessage);
    this.afs
      .collection("chat_head")
      .doc(this.chatHeadId)
      .set({

        chat_head_id: this.chatHeadId,
        last_message: newMsg,
        created_at: createdAt,
        users: [senderId.user_id.toLowerCase(), receiverId.user_id.toLowerCase()],
        user_info: [
          { user_id: senderId.user_id, user_image: senderId.profile_image, user_name: senderId.name },
          { user_id: receiverId.user_id, user_image: receiverId.profile_image, user_name: receiverId.name }]
      }, { merge: true })


  }




  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }
}