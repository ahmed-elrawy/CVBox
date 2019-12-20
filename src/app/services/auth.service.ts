import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../classes/user";
import { Alert } from "../classes/alert";
import { AlertService } from "../servies/alert.service";
import { Observable, of, } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User
  public userData: any; // User data var


  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.userData = user; // Setting up user data in userData var
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
          return of(null);
        }
      })
    )
    this.setCurrentUserSnapshot()
  }

  public signup(firstName: string, lastName: string, email: string, password: string, phone: string): Observable<boolean> {
    const promise = this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        const updatedUser = {
          id: user.user.uid,
          email: user.user.email,
          firstName,
          lastName,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-4f314.appspot.com/o/default_profile_pic.jpg?alt=media&token=15171a5a-45fa-4e7e-9a4a-522bb330f2ba',
          phone
        }

        userRef.set(updatedUser);
        return true;
      })
      .catch((err) => false)
    return from(promise);



  }


  public login(email: string, password: string): Observable<boolean> {
    const promise = this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => this.router.navigate(['/home']))
      .catch((user) => false)
    return from(promise);

  }

  public logout(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/home']);
        this.alertService.alerts.next(new Alert('You have been signed out.'))

      })
  }

  private setCurrentUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currentUserSnapshot = user)
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['<!-- enter your route name here -->']);
      })
  }


  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

}