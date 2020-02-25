import { Component, OnInit } from '@angular/core';
import { CvBoxService } from 'src/app/services/cv-box.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/classes/user';

import { MatDialog } from '@angular/material/dialog';
import { FilterCvComponent } from "../filter-cv/filter-cv.component";

export interface DialogData {
  profileImg: 'image';
}


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
    public auth: AuthService,
    public dialog: MatDialog
  ) {



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


  openDialog() {
    const dialogRef = this.dialog.open(FilterCvComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
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



