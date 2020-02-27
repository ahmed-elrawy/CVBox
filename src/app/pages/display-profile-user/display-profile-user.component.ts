import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../../classes/user";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-display-profile-user',
  templateUrl: './display-profile-user.component.html',
  styleUrls: ['./display-profile-user.component.scss']
})
export class DisplayProfileUserComponent implements OnInit, OnDestroy {
  public currentUser: User = null;

  public curentView: string = "personal-info";


  user: User;

  userID: string = ""


  constructor(
    public activatedRoute: ActivatedRoute,
    public db: AngularFirestore,
    public auth: AuthService,
    public chat: ChatService

  ) {
    this.activatedRoute.params.subscribe(params => {
      this.userID = params['id'];
    });
  }

  ngOnInit() {

    //this for show temple message in display profile user
    this.chat.showtempletmessage(this.userID)

    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })

    this.db.doc<User>(`users/${this.userID}`).valueChanges().subscribe(
      user => {
        this.user = user

      }, (error) => {
        console.log(error);
      }
    );
  }


  changeMessage() {
  }

  view(key: string): void {
    if (key == "personal-info") {
      this.curentView = "personal-info"

    } if (key == "resume-info") {
      this.curentView = "resume-info"

    }
  }

  ngOnDestroy() {
    this.chat.showTempletMessage = false

  }

}
