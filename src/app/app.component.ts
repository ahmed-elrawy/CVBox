import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

import { Alert } from './classes/alert';
import { AlertService } from './servies/alert.service';
import { LoadingService } from './servies/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ChatService } from "./services/chat.service"
import { User } from "./classes/user";
import { Message } from './classes/message';
import { map } from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
export class AppComponent implements OnInit, OnDestroy {

  step = 0;
  // senderImageUrl = JSON.parse(localStorage.getItem('user')).image_url
  chatView = false
  public currentUser: User = null;
  chatHead;
  newMsg: string;

  userId = JSON.parse(localStorage.getItem('user')).user_id.toLowerCase()
  private subscriptions: Subscription[] = [];
  public alerts: Array<Alert> = [];
  public loading: boolean = false;
  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private chat: ChatService
  ) {
  }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(user)
    })
    this.chat.getchatHeads(JSON.parse(localStorage.getItem('user')).user_id.toLowerCase())
    this.subscriptions.push(
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert);
      })
    )

    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading
      })
    )

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
    if (this.chatHead.users[0] == JSON.parse(localStorage.getItem('user')).user_id.toLowerCase()) {
      console.log(this.newMsg, this.chatHead.users[0], this.chatHead.users[1], this.chatHead.chat_head_id)
      this.chat.sendMessage(this.newMsg, this.chatHead.users[0], this.chatHead.users[1], this.chatHead.chat_head_id)
    } else {
      console.log(this.newMsg, this.chatHead.users[1], this.chatHead.users[0], this.chatHead.chat_head_id)

      this.chat.sendMessage(this.newMsg, this.chatHead.users[1], this.chatHead.users[0], this.chatHead.chat_head_id)

    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe)
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
