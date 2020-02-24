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
    console.log(senderId, receiverId)
    let secondtID = this.fun(senderId.toLowerCase());
    let firstID = this.fun(receiverId.toLowerCase());

    let sum = secondtID * firstID;

    this.chatHeadId = "" + sum;
    this.getChat()
    this.getchatHeads(secondtID)
    // this.getMessages(this.chatHead)
  }

  fun(id: string): number {

    let count: number = 1;


    for (let i = 0; i < id.length; i++) {
      let index = this.list.indexOf(id.charAt(i));

      if (index > 0) {
        count *= index;
      }
    }
    console.log(count)

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

    this.allMessages.subscribe(head => {
      console.log(head)
    })
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
  // get(chatId) {
  //   return this.afs
  //     .collection<any>('chats')
  //     .doc(chatId)
  //     .snapshotChanges()
  //     .pipe(
  //       map(doc => {
  //         return { id: doc.payload.id, ...doc.payload.data() as {} };
  //       })
  //     );
  // }

  // getUserChats() {
  //   return this.auth.currentUser.pipe(
  //     switchMap(user => {
  //       return this.afs
  //         .collection('chats', ref => ref.where('user_id', '==', user.user_id))
  //         .snapshotChanges()
  //         .pipe(
  //           map(actions => {
  //             return actions.map(a => {
  //               const data: Object = a.payload.doc.data();
  //               const id = a.payload.doc.id;
  //               return { id, ...data };
  //             });
  //           })
  //         );
  //     })
  //   );
  // }

  // getChatId(idChat) {
  //   return this.auth.currentUser.pipe(
  //     switchMap(user => {
  //       return this.afs
  //         .collection(`chat/${idChat}`)
  //         .snapshotChanges()
  //         .pipe(
  //           map(actions => {
  //             return actions.map(a => {
  //               const data: Object = a.payload.doc.data();
  //               const id = a.payload.doc.id;
  //               return { id, ...data };
  //             });
  //           })
  //         );
  //     })
  //   );
  // }
  // async create() {
  //   const { user_id } = await this.auth.getUser();

  //   const data = {
  //     user_id,
  //     createdAt: Date.now(),
  //     count: 0,
  //     messages: []
  //   };

  //   const docRef = await this.afs.collection('chats').add(data);

  //   return this.router.navigate(['chats', docRef.id]);
  // }

  // async sendMessage(chatId, content) {
  //   const { user_id } = await this.auth.getUser();

  //   const data = {
  //     user_id,
  //     content,
  //     createdAt: Date.now()
  //   };

  //   if (user_id) {
  //     const ref = this.afs.collection('chats').doc(chatId);
  //     return ref.update({
  //       messages: firestore.FieldValue.arrayUnion(data)
  //     });
  //   }
  // }

  // joinUsers(chat$: Observable<any>) {
  //   let chat;
  //   const joinKeys = {};

  //   return chat$.pipe(
  //     switchMap(c => {
  //       // Unique User IDs
  //       chat = c;
  //       const uids = Array.from(new Set(c.messages.map(v => v.user_id)));

  //       // Firestore User Doc Reads
  //       const userDocs = uids.map(u =>
  //         this.afs.doc(`users/${u}`).valueChanges()
  //       );

  //       return userDocs.length ? combineLatest(userDocs) : of([]);
  //     }),
  //     map(arr => {
  //       arr.forEach(v => (joinKeys[(<any>v).user_id] = v));
  //       chat.messages = chat.messages.map(v => {
  //         return { ...v, user: joinKeys[v.user_id] };
  //       });

  //       return chat;
  //     })
  //   );
  // }
}
