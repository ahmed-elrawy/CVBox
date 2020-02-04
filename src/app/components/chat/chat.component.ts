import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Message } from "../../classes/message";
import { User } from "../../classes/user";
import { ChatHead } from "../../classes/chat_head";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { ScrollToBottomDirective } from '../../servies/scroll-to-bottom.directive'



import * as firebase from 'firebase';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  step = 0;

  list: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  chatHeadId: string = "";

  chat$: Observable<any>;
  newMsg: string;

  messagesCollection: AngularFirestoreCollection<Message>
  messages: Observable<Message[]>

  senderId
  receiverId

  sender_info
  receiver_info

  userSender
  allMessagesCollection: AngularFirestoreCollection<Message>
  allMessages: Observable<Message[]>

  chatHeadCollection: AngularFirestoreCollection<ChatHead>
  chatHead: Observable<ChatHead[]>

  @ViewChild(ScrollToBottomDirective, { static: false })
  scroll: ScrollToBottomDirective;
  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private db: AngularFirestore,
    public chat: ChatService
  ) {
    this.receiverId = this.route.snapshot.paramMap.get('id');
    this.senderId = JSON.parse(localStorage.getItem('user')).user_id;


  }

  ngOnInit() {
    this.db.doc<User>(`users/${this.senderId}`).valueChanges().subscribe(
      user => {
        this.sender_info = user
        console.log(user)

      }, (error) => {
        console.log(error);
      }
    );

    this.db.doc<User>(`users/${this.receiverId}`).valueChanges().subscribe(
      user => {
        this.receiver_info = user
        console.log(user)
      }, (error) => {
        console.log(error);
      }
    );

    this.chat.fun2(this.senderId.toLowerCase(), this.receiverId.toLowerCase())

  }

  getChat() {

    this.messagesCollection = this.db.collection(`messages`, ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('chat_id', '==', this.chatHeadId)

    });
    this.messages = this.messagesCollection.valueChanges();
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




  sendMessage() {
    // this.newMsg = ""

    this.chat.sendMessage(this.newMsg, this.sender_info, this.receiver_info)



  }


  getMessages() {

    this.allMessagesCollection = this.db.collection('messages', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('chat_head_id', '==', this.chatHeadId)

    });
    this.allMessages = this.allMessagesCollection.valueChanges();
  }

  getchatHeads() {

    this.chatHeadCollection = this.db.collection('chat_head', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('users', 'array-contains', this.senderId)

    });
    this.chatHead = this.chatHeadCollection.valueChanges();
  }


  // chat window
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  // submit(chatId) {
  //   if (!this.newMsg) {
  //     return alert('you need to enter something');
  //   }
  //   this.cs.sendMessage(chatId, this.newMsg);
  //   this.newMsg = '';
  //   this.scrollBottom();
  // }

  // trackByCreated(i, msg) {
  //   return msg.createdAt;
  // }


  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

}
