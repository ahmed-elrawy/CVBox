import { Component, ViewEncapsulation, OnInit, } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { animatation } from "../animation";


import { AuthService } from '../../../services/auth.service';
import { ChatService } from "../../../services/chat.service"
import { User } from "../../../classes/user";
import { Message } from '../../../classes/message';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatHead } from '../../../classes/chat_head';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['../chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [animatation],
})
export class ChatListComponent implements OnInit {


  user
  userIdLowerCase

  secondUser
  secondUserID

  step = 1;
  chatView = false
  headsList
  chatHead: ChatHead;

  newMsg: string;







  constructor(
    private auth: AuthService,
    public chat: ChatService,
    private db: AngularFirestore
  ) {

  }


  ngOnInit() {

    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.user = user
      this.userIdLowerCase = this.user.user_id.toLowerCase()
      this.chat.getchatHeads(this.userIdLowerCase)

      this.db.doc<User>(`users/${user.user_id}`).valueChanges().subscribe(
        user => {
          this.user = user

        }, (error) => {
          console.log(error);
        }
      );

      //get chat header list
      this.chat.chatHead.subscribe(head => {
        this.headsList = head

      })


    }











  }


  getMessages(idMessages, userinfo) {

    this.chatView = !this.chatView

    if (userinfo[0].user_id == this.user.user_id) {
      this.secondUserID = userinfo[1].user_id
      this.getUserInfo(userinfo[1].user_id)

    } else {
      this.secondUserID = userinfo[0].user_id
      this.getUserInfo(userinfo[0].user_id)
    }

    this.chat.getMessages(idMessages)
    this.chat.getchatHeads(this.userIdLowerCase)


  }

  getUserInfo(id) {

    this.db.doc<User>(`users/${id}`).valueChanges().subscribe(
      user => {
        this.secondUser = user

      }, (error) => {
        console.log(error);
      });

  }


  sendMessage() {
    this.chat.fun2(this.userIdLowerCase, this.secondUserID.toLowerCase())


    if (this.newMsg != "") {
      this.chat.sendMessage(this.newMsg, this.secondUser, this.user)

    }
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
    console.log('colse')

  }





}
