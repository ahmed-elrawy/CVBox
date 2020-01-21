import { Injectable, NgZone } from '@angular/core';
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
import { AlertType } from 'src/app/enum/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User
  public userData: User; // User data var


  constructor(
    private router: Router,
    private alertService: AlertService,
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    public ngZone: NgZone
  ) {
    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          const userData = {
            user_id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
          };
          this.userData = userData// Setting up user data in userData var
          localStorage.setItem('user', JSON.stringify(userData));
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

  public signup(name: string, email: string, password: string, phone: string): Observable<boolean> {
    const promise = this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.SendVerificationMail();
        this.SetUserData(user, name, password, phone, [null])
        return true;
      })
      .catch((err) => {
        window.alert(err.message)
        return false
      })
    return from(promise);



  }


  public login(email: string, password: string): Observable<boolean> {
    const promise = this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {

        if (this.afAuth.auth.currentUser.emailVerified) {
          this.ngZone.run(() => {
            console.log()
          });
        } else {
          // alert("this email not verified")
          this.displayFailedLogin("this email not verified");
          this.router.navigate(['verify-email-address']);

        }
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        const updatedUser = {
          user_id: user.user.uid,
          email: user.user.email,
          emailVerified: user.user.emailVerified
        }

        userRef.set(updatedUser, {
          merge: true
        });

        return true
      })
      .catch((err) => {
        // window.alert(err.message)
        this.displayFailedLogin(err.message)
        return false
      })
    return from(promise);

  }
  // public login(email: string, password: string): Observable<boolean> {
  //   const promise = this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then((user) => true)
  //     .catch((user) => false)
  //   return from(promise);

  // }

  public logout(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/home']);
        this.alertService.alerts.next(new Alert('You have been signed out.'))

      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  private setCurrentUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currentUserSnapshot = user)
  }
  SetUserData(user, name?: string, password?: string, phone?: string, departments?: [string]) {
    console.log(user.user.emailVerified)
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
    const updatedUser = {
      user_id: user.user.uid,
      email: user.user.email,
      name,
      profile_image: 'https://firebasestorage.googleapis.com/v0/b/cvstore-73c98.appspot.com/o/%20profile%2Fuser.png?alt=media&token=ac2e28d3-33d1-4878-9ae4-b946bd39ce76',
      phone,
      password,
      departments,
      emailVerified: user.user.emailVerified,
      cv_ready: false,
      profile_ready: false,
      created_at: firebase.firestore.FieldValue.serverTimestamp()

    }

    userRef.set(updatedUser, {
      merge: true
    });
  }

  // Send email verfificaiton when new user sign up
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }


  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  private displayFailedLogin(message): void {
    const faildLoginAlert = new Alert(message, AlertType.Danger)
    this.alertService.alerts.next(faildLoginAlert);
  }
}