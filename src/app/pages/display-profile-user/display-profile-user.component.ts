import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from "../../classes/user";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-display-profile-user',
  templateUrl: './display-profile-user.component.html',
  styleUrls: ['./display-profile-user.component.scss']
})
export class DisplayProfileUserComponent implements OnInit {

  public curentView: string = "personal-info";
  parentMessage = ""

  user: User;

  userID: string = ""

  changeColor: string = ""

  constructor(
    public activatedRoute: ActivatedRoute,
    public db: AngularFirestore,

  ) {
    this.activatedRoute.params.subscribe(params => {
      this.userID = params['id'];
      console.log(`${this.userID}`);
    });
  }

  ngOnInit() {


    this.db.doc<User>(`users/${this.userID}`).valueChanges().subscribe(
      user => {
        this.user = user
        console.log(this.user)

      }, (error) => {
        console.log(error);
      }
    );
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
