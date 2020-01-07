import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';
import { CvBoxService } from 'src/app/services/cv-box.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { User } from "../../classes/user";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Input() childMessage: string;
  user: User


  infoForm: FormGroup;
  emailMessage: string;

  userdata: any = {}
  departmentCollection: AngularFirestoreCollection<any>;


  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };
  constructor(
    private fb: FormBuilder,
    private country: CountriesService,
    private db: AngularFirestore,
    private cv: CvBoxService,
    private firestore: AngularFirestore,
    private auth: AuthService) {
    this.user = JSON.parse(localStorage.getItem('user'));


  }

  ngOnInit() {
    // console.log(this.childMessage)
    this.db.doc<any>(`users/${this.childMessage}`).valueChanges().subscribe(
      user => {
        this.userdata = user;
        this.populateTestDate()

        console.log(this.userdata)
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
      departments: ['', Validators.required],
      year_experience: ['', Validators.required],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      marital: ['', [Validators.required]],
      military: ['', [Validators.required],]

    })

    // this.infoForm.patchValue({
    //   category: this.userdata.category,
    //   departments: this.userdata.departments,
    //   country: this.userdata.country,
    //   state: this.userdata.state,
    // })




  }



  populateTestDate() {

    if (this.userdata.category && this.userdata.country) {
      this.cv.getCategories()
      this.cv.getDepartments(this.userdata.category)
      this.country.onChangeCountry(this.userdata.country)
    }

    this.infoForm.patchValue({
      name: this.userdata.name,
      email: this.userdata.email,
      // lastName: this.userdata.lastName,
      phone: this.userdata.phone,
      age: this.userdata.age,
      gender: this.userdata.gender,
      jobTitle: this.userdata.jobTitle,
      category: this.userdata.category,
      departments: this.userdata.departments,
      year_experience: this.userdata.year_experience,
      country: this.userdata.country,
      state: this.userdata.state,
      city: this.userdata.city,
      marital: this.userdata.marital,
      military: this.userdata.military
    })
  }

  // get cat() {
  //   return this.userdata.category;

  // }

  onSubmit(form: NgForm) {
    alert("info updated")
    let data = Object.assign({}, form.value);
    // delete data.id;
    if (this.auth.userData.uid == null)
      this.firestore.collection('users').add(data);
    else
      this.firestore.doc('users/' + this.user.uid).update(data).catch(err => console.log(err + " errrrrrrrrrrrrrrrrrrrrrrrr"))

  }




}