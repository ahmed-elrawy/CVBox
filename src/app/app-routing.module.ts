import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileUserComponent },
  { path: 'profile/info', component: ProfileUserComponent, canActivate: [AuthGuard] },

  // {
  //   path: 'personal-info', component: PersonalInfoComponent, canActivate: [AuthGuard],
  // },
  { path: '**', redirectTo: '/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
