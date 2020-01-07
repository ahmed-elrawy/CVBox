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
  showSpinner

  idTemp
  constructor(
    public cv: CvBoxService,
    public db: AngularFirestore,
    public auth: AuthService) {



  }

  ngOnInit() {
    this.cv.getCategories()
    this.cv.currentLoadState.subscribe(state => {
      this.showSpinner = state
    })
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })




  }


  onClick(key: string) {
    if (key == "category") {
      this.cv.getCategories()

      this.category = true
      this.department = false;
      this.user = false
    } if (key === "department") {
      this.getDepartments(this.idTemp)
      this.category = false
      this.user = false
    }

  }

  getDepartments(id) {
    this.idTemp = id
    this.showSpinner = true
    this.department = !this.department
    this.category = !this.category
    this.cv.getDepartments(id)
    this.cv.departments.subscribe(() => this.showSpinner = false)

  }

  getUsers(id) {
    this.showSpinner = true

    this.department = false
    this.category = false
    this.user = true

    this.cv.getUsers(id)
    this.cv.users.subscribe(() => this.showSpinner = false)


  }




}



