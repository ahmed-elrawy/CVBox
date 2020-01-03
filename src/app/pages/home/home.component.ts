import { Component, OnInit } from '@angular/core';
import { CvBoxService } from 'src/app/services/cv-box.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/classes/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser: User = null;

  category: boolean = true
  department: boolean = false
  user: boolean = false;
  showSpinner: boolean = true;
  token

  constructor(
    public cv: CvBoxService,
    public db: AngularFirestore,
    public auth: AuthService) {


  }

  ngOnInit() {
    // this.afAuth.auth.currentUser.getIdToken().then((token: string) => {
    //   this.token = token; console.log(this.token)
    // }).catch(error => console.log(error))

    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })

    this.cv.categories.subscribe(() => this.showSpinner = false)

  }



  getDepartments(id) {
    this.department = !this.department
    this.category = !this.category
    this.cv.getDepartments(id)
  }

  getUsers(id) {
    this.department = false
    this.category = false
    this.user = true

    this.cv.getUsers(id)

  }




}
