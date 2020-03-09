import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public currentUser: User = null;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }

}
