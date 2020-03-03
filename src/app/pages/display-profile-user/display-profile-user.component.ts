import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../../classes/user";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { FormGroup, Validators, FormBuilder, FormArray, NgForm, FormControl } from '@angular/forms';


@Component({
  selector: 'app-display-profile-user',
  templateUrl: './display-profile-user.component.html',
  styleUrls: ['./display-profile-user.component.scss']
})
export class DisplayProfileUserComponent implements OnInit, OnDestroy {
  public currentUser: User = null;

  public curentView: string = "personal-info";


  user: User;

  userID: string = ""


  infoForm: FormGroup;
  userdata: any = {}



  constructor(
    public activatedRoute: ActivatedRoute,
    public db: AngularFirestore,
    public auth: AuthService,
    public chat: ChatService,
    public fb: FormBuilder,


  ) {
    this.activatedRoute.params.subscribe(params => {
      this.userID = params['id'];
    });
  }

  ngOnInit() {

    //this for show temple message in display profile user
    this.chat.showtempletmessage(this.userID)

    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })

    this.db.doc<User>(`users/${this.userID}`).valueChanges().subscribe(
      user => {
        this.user = user
        this.userdata = user;
        this.populateTestDate()

      }, (error) => {
        console.log(error);
      }
    );

    this.infoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      jobTitle: ['', Validators.required],
      category: ['', Validators.required],
      department: ['', Validators.required],
      year_experience: ['', Validators.required],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      marital_status: ['', [Validators.required]],
      military_status: ['', [Validators.required],],

    })

  }


  populateTestDate() {



    this.infoForm.patchValue({
      name: this.userdata.name,
      email: this.userdata.email,
      phone: this.userdata.phone,
      age: this.userdata.age,
      gender: this.userdata.gender,
      jobTitle: this.userdata.jobTitle,
      category: this.userdata.category,
      department: this.userdata.departments[0],
      year_experience: this.userdata.year_experience,
      country: this.userdata.country,
      state: this.userdata.state,
      city: this.userdata.city,
      marital_status: this.userdata.marital_status,
      military_status: this.userdata.military_status,
    })



  }

  changeMessage() {
  }

  view(key: string): void {
    if (key == "personal-info") {
      this.curentView = "personal-info"

    } if (key == "resume-info") {
      this.curentView = "resume-info"

    }
  }

  ngOnDestroy() {
    this.chat.showTempletMessage = false

  }

}
