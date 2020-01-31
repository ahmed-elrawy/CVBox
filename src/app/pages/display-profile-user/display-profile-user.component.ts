import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from "../../classes/user";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-display-profile-user',
  templateUrl: './display-profile-user.component.html',
  styleUrls: ['./display-profile-user.component.scss']
})
export class DisplayProfileUserComponent implements OnInit {
  public currentUser: User = null;

  public curentView: string = "personal-info";
  list: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  parentMessage = ""

  user: User;

  userID: string = ""

  changeColor: string = ""

  constructor(
    public activatedRoute: ActivatedRoute,
    public db: AngularFirestore,
    public auth: AuthService

  ) {
    this.activatedRoute.params.subscribe(params => {
      this.userID = params['id'];
      console.log(`${this.userID}`);
    });
  }

  ngOnInit() {
    const senderId = JSON.parse(localStorage.getItem('user')).user_id.toLowerCase();
    let secondtID = this.fun(senderId);

    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })

    this.db.doc<User>(`users/${this.userID}`).valueChanges().subscribe(
      user => {
        this.user = user
        console.log(this.user)

      }, (error) => {
        console.log(error);
      }
    );
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
  onclick() {
    this.parentMessage = "message from parent"
  }

  view(key: string): void {
    if (key == "personal-info") {
      this.curentView = "personal-info"
      console.log(this.curentView)

    } if (key == "resume-info") {
      this.curentView = "resume-info"
      console.log(this.curentView)

    }
  }

}
