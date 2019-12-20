import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';

// Module
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap";
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';





//firebase
import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
//guards
//services
import { AuthService } from './services/auth.service';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountriesService } from './services/countries.service';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    SignupComponent,
    ProfileUserComponent,
    PersonalInfoComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    NgbModule,
    NgbCollapseModule,
    NgxLoadingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    CarouselModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    CountriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
