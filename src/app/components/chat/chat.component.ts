import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  @Input() receiverid: string;



  step = 0;

  newMsg: string;


  senderId
  receiverId

  sender_info
  receiver_info

  allMessages
  constructor(
    public cs: ChatService,
    public auth: AuthService,
    private db: AngularFirestore,
    public chat: ChatService
  ) {
    // this.receiverId = this.route.snapshot.paramMap.get('id');
    this.senderId = JSON.parse(localStorage.getItem('user')).user_id;


  }

  ngOnInit() {
    console.log('receiver input' + this.receiverid)
    this.db.doc<User>(`users/${this.senderId}`).valueChanges().subscribe(
      user => {
        this.sender_info = user
        console.log(user)

      }, (error) => {
        console.log(error);
      }
    );

    this.db.doc<User>(`users/${this.receiverid}`).valueChanges().subscribe(
      user => {
        this.receiver_info = user
        console.log(user)
      }, (error) => {
        console.log(error);
      }
    );

    this.chat.fun2(this.senderId.toLowerCase(), this.receiverid.toLowerCase())

  }







  sendMessage() {
    // this.newMsg = ""

    this.chat.sendMessage(this.newMsg, this.receiver_info, this.sender_info)



  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }







}
