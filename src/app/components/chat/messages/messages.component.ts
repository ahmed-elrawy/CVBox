import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { animatation } from "../animation";
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

import { ChatService } from '../../../services/chat.service';

import { AuthService } from '../../../services/auth.service';
import { Message } from "../../../classes/message";
import { User } from "../../../classes/user";
import { ChatHead } from "../../../classes/chat_head";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['../chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [animatation],

  // for remove angular matrial class


})
export class MessagesComponent implements OnInit {

  @Input() receiverid: string;



  step = 1;








  user
  userIdLowerCase

  secondUser
  secondUserID

  headsList
  chatHead: ChatHead;


  chatView = false
  newMsg: string;


  constructor(
    public auth: AuthService,
    private db: AngularFirestore,
    public chat: ChatService
  ) { }

  ngOnInit() {

    console.log("message copmonent it is work ")
    console.log("second user " + this.secondUser)

    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      this.user = user
      this.userIdLowerCase = this.user.user_id.toLowerCase()

      //user
      this.db.doc<User>(`users/${user.user_id}`).valueChanges().subscribe(
        user => {
          this.user = user
        }, (error) => {
          console.log(error);
        });
      //reciever
      this.db.doc<User>(`users/${this.receiverid}`).valueChanges().subscribe(
        user => {
          this.secondUser = user
        }, (error) => {
          console.log(error);
        });

      this.chat.getMessages(this.sum(this.receiverid, this.userIdLowerCase))


    }










  }

  sum(senderId, receiverId) {
    let secondtID = this.chat.fun(senderId.toLowerCase());
    let firstID = this.chat.fun(receiverId.toLowerCase());
    let sum = `${secondtID * firstID}`;
    return sum
  }


  sendMessage() {
    this.chat.fun2(this.userIdLowerCase, this.receiverid.toLowerCase())

    this.chat.sendMessage(this.newMsg, this.secondUser, this.user)

    this.newMsg = ""

  }


  trackById(index: number, message: Message): string {
    return message.message_id;
  }

  scrollToBottom(): void {
    setTimeout(() => window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' }));
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

  close() {
    this.chatView = !this.chatView

  }




}
