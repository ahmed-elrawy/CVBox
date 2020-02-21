import { Component, ViewEncapsulation, OnInit, } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';


import { AuthService } from '../../services/auth.service';
import { ChatService } from "../../services/chat.service"
import { User } from "../../classes/user";
import { Message } from '../../classes/message';
import { map } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatHead } from '../../classes/chat_head';
@Component({
  selector: 'app-chat-over',
  templateUrl: './chat-over.component.html',
  styleUrls: ['./chat-over.component.scss'], encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          [
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        )
      ])
    ])
  ] // for remove angular matrial class


})
export class ChatOverComponent implements OnInit {

  step = 0;
  chatView = false
  public currentUser: User = null;
  headsList
  chatHead: ChatHead;
  newMsg: string;
  userSender
  chatHeadinformation: ChatHead = null;

  senderId
  receiverId
  sender_info
  receiver_info


  userId

  constructor(
    private auth: AuthService,
    public chat: ChatService,
    private db: AngularFirestore
  ) { }


  ngOnInit() {

    if (JSON.parse(localStorage.getItem('user'))) {
      this.senderId = JSON.parse(localStorage.getItem('user')).user_id;
      this.chat.getchatHeads(JSON.parse(localStorage.getItem('user')).user_id.toLowerCase())
      this.userId = this.senderId.toLowerCase()
      this.chat.chatHead.pipe(
        map(head => {
          this.headsList = head
          return head.filter(item => item.users[0] || item.users[1] == this.senderId.toLowerCase())[0]
        })
      ).subscribe(head => {
        this.chatHeadinformation = head
        this.getUserInfo()
      });

    }









    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(user)
    })

  }

  getUserInfo() {
    this.db.doc<User>(`users/${this.senderId}`).valueChanges().subscribe(
      user => {
        this.sender_info = user

      }, (error) => {
        console.log(error);
      }
    );

    if (this.chatHeadinformation) {
      if (this.chatHeadinformation.user_info[0].user_id == this.senderId) {
        this.receiverId = this.chatHeadinformation.user_info[1].user_id
      } else {
        this.receiverId = this.chatHeadinformation.user_info[0].user_id
      }
      this.db.doc<User>(`users/${this.receiverId}`).valueChanges().subscribe(
        user => {
          this.receiver_info = user
        }, (error) => {
          console.log(error);
        }
      );
      this.chat.fun2(this.senderId.toLowerCase(), this.receiverId.toLowerCase())

    }

  }
  trackById(index: number, message: Message): string {
    return message.message_id;
  }

  scrollToBottom(): void {
    setTimeout(() => window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' }));
  }
  getMessages(idMessages) {
    this.chatView = !this.chatView
    this.chat.getMessages(idMessages)
    this.chat.getchatHeads(JSON.parse(localStorage.getItem('user')).user_id.toLowerCase())

    this.chat.chatHead.pipe(
      map(head => {
        return head.filter(item => item.chat_head_id == idMessages)[0]
      })
    ).subscribe(head => {
      this.chatHead = head
      console.log(this.chatHead)
    });
  }

  // ngAfterViewInit() {
  //   this.scrollToBottom();
  // }

  sendMessage() {



    console.log(this.newMsg, this.sender_info, this.receiver_info)
    this.chat.sendMessage(this.newMsg, this.receiver_info, this.sender_info)

    this.newMsg = ""

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
