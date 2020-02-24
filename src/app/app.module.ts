import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { UsersComponent } from './pages/users/users.component';
import { DialogOverviewCropeImgComponent } from './components/dialog-overview-crope-img/dialog-overview-crope-img.component';



//pipe
import { SafePipe } from "./core/safe.pipe";

// Module
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap";
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng5SliderModule } from 'ng5-slider';

//firebase
import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//services&&guards
import { AuthService } from './services/auth.service';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountriesService } from './services/countries.service';
import { AuthGuard } from './core/auth.guard';
import { AlertService } from './servies/alert.service';
import { LoadingService } from './servies/loading.service';
import { DisplayProfileUserComponent } from './pages/display-profile-user/display-profile-user.component';
import { CvBoxService } from './services/cv-box.service';
import { FilterCvComponent } from './pages/filter-cv/filter-cv.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatOverComponent } from './components/chat-over/chat-over.component';
import { ScrollToBottomDirective } from './servies/scroll-to-bottom.directive';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';
import { MessagesComponent } from './components/chat/messages/messages.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileUserComponent,
    PersonalInfoComponent,
    LoadingSpinnerComponent,
    SafePipe,
    ScrollToBottomDirective,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DisplayProfileUserComponent,
    DepartmentsComponent,
    UsersComponent,
    DialogOverviewCropeImgComponent,
    FilterCvComponent,
    ChatComponent,
    ChatOverComponent,
    ChatListComponent,
    MessagesComponent

  ],
  entryComponents: [DialogOverviewCropeImgComponent],
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
    HttpClientModule,
    ImageCropperModule,
    Ng5SliderModule
  ],
  providers: [
    AlertService,
    LoadingService,
    AuthService,
    AuthGuard,
    CountriesService,
    CvBoxService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
