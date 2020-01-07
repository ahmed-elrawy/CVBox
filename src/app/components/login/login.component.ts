import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators } from "@angular/forms";
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enum/alert-type.enum';
import { AlertService } from 'src/app/servies/alert.service';
import { LoadingService } from 'src/app/servies/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    // TODO call the auth service
    // const email = this.loginForm.value.email
    // const password = this.loginForm.value.password

    if (this.loginForm.valid) {
      this.loadingService.isLoading.next(true)
      const { email, password } = this.loginForm.value;

      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => {
          if (success && this.auth.afAuth.auth.currentUser.emailVerified) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            // this.displayFailedLogin()
          }
          this.loadingService.isLoading.next(false);
          console.log(success)
        })
      );
    } else {
      this.loadingService.isLoading.next(false);
      this.displayFailedLogin()
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  private displayFailedLogin(): void {
    const faildLoginAlert = new Alert('invalid email/password, try agin', AlertType.Danger)
    this.alertService.alerts.next(faildLoginAlert);
  }

}


