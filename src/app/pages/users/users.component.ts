import { Component, OnInit } from '@angular/core';
import { CvBoxService } from 'src/app/services/cv-box.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public currentUser: User = null;

  userId: string = "";
  showSpinner: boolean = true

  constructor(
    private cv: CvBoxService,
    private activetedRouter: ActivatedRoute,
    public auth: AuthService) { }

  ngOnInit() {

    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })
    this.activetedRouter.params.subscribe(params => {
      this.userId = params['id'];
      console.log(`${this.userId}`)
      this.getUsers(this.userId)
    })
  }

  getUsers(id) {


    this.cv.getUsers(id)
    this.cv.users.subscribe(() => this.showSpinner = false)



  }

}
