import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Info } from './info';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];

  infoForm: FormGroup;
  emailMessage: string;


  get jobs(): FormArray {
    return this.infoForm.get('jobs') as FormArray;
  }

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };
  constructor(private fb: FormBuilder, private country: CountriesService) { }

  ngOnInit() {
    this.getCountries();

    this.infoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      jobs: this.fb.array([this.buildJob()]),
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]]
    })
  }

  getCountries() {
    this.country.allCountries().
      subscribe(
        data2 => {
          this.countryInfo = data2.Countries;
          //console.log('Data:', this.countryInfo);
        },
        err => console.log(err),
        () => console.log('complete')
      )
  }

  onChangeCountry(countryValue) {
    this.stateInfo = this.countryInfo[countryValue].States;
    this.cityInfo = this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue) {
    this.cityInfo = this.stateInfo[stateValue].Cities;
    //console.log(this.cityInfo);
  }

  buildJob(): FormGroup {
    return this.fb.group({
      jobTitle: ['', Validators.required],
      category: ['', Validators.required],
      department: ['', Validators.required],
      yearsOfEperience: ['', Validators.required]
    })
  }

  addJob(): void {
    this.jobs.push(this.buildJob());
  }
  // isLinear = false;
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // thirdFormGroup: FormGroup;

  // constructor(private _formBuilder: FormBuilder) { }

  // ngOnInit() {
  //   this.firstFormGroup = this._formBuilder.group({
  //     firstname: ['', Validators.required],
  //     lastname: ['', Validators.required],
  //     phone: ['', Validators.required]


  //   });
  //   this.secondFormGroup = this._formBuilder.group({
  //     jobTitle: ['', Validators.required],
  //     category: ['', Validators.required],
  //     department: ['', Validators.required],
  //     yeareEperience: ['', Validators.required]
  //   });

  //   this.thirdFormGroup = this._formBuilder.group({
  //     country: ['', Validators.required],
  //     state: ['', Validators.required],
  //     city: ['', Validators.required],
  //   });
  // }
}