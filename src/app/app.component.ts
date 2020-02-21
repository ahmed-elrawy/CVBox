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
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatHead } from './classes/chat_head';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit, OnDestroy {

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

  private subscriptions: Subscription[] = [];
  public alerts: Array<Alert> = [];
  public loading: boolean = false;
  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,


  ) {

  }

  ngOnInit() {


    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(user)
    })


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

  // ngAfterViewInit() {
  //   this.scrollToBottom();
  // }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe)
  }


}
