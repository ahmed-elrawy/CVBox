import { Component, OnInit } from '@angular/core';
import { CvBoxService } from 'src/app/services/cv-box.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material';
import { FilterCvComponent } from "../filter-cv/filter-cv.component";

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public currentUser: User = null;

  userId: string = "";
  showSpinner: boolean = true


  // public dataList$: Observable<any[]>;
  data: Observable<any>


  constructor(
    public cv: CvBoxService,
    public activetedRouter: ActivatedRoute,
    public auth: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.cv.data.subscribe(data => {
      data.map(count => {
        if (count >= 0) {
          console.log('is aempty')
        }
      })
    })



    // .map(count => count > 0).defaultIfEmpty(false);

    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })
    this.cv.currentLoadState.subscribe(ststs => {
      this.showSpinner = ststs
    })


    this.activetedRouter.params.subscribe(params => {
      if (params['id']) {
        this.userId = params['id'];
        console.log(`${this.userId}`)
        this.getUsers(this.userId)
      } else {
        console.log("no user id")
        this.cv.data.subscribe(() => this.showSpinner = false)
        this.cv.data.subscribe(user => console.log(user))
      }
    })

    this.cv.data.subscribe(data => {
      console.log(data.length)
    })
  }


  openDialog() {
    const dialogRef = this.dialog.open(FilterCvComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getUsers(id) {


    this.cv.getUsers(id)
    // this.cv.data.subscribe(() => this.showSpinner = false)



  }

}
