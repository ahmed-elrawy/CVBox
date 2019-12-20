import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from "rxjs/operators";
import { AlertService } from '../servies/alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enum/alert-type.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private alertService: AlertService) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.currentUser.pipe(
      take(1),
      map((currentUser) => !!currentUser), // to change to boolean and get origenal value 
      tap((loggedIn) => {
        if (!loggedIn) {
          this.alertService.alerts.next(new Alert('you must be logged in to access that page.', AlertType.Danger));
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
        }
      })
    )

  }

}
