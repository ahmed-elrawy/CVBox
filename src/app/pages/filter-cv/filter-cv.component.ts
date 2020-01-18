import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';
import { CvBoxService } from 'src/app/services/cv-box.service';
import { Options } from 'ng5-slider';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/servies/alert.service';
import { LoadingService } from 'src/app/servies/loading.service';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enum/alert-type.enum';



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-filter-cv',
  templateUrl: './filter-cv.component.html',
  styleUrls: ['./filter-cv.component.scss']
})
export class FilterCvComponent implements OnInit {

  filterForm: FormGroup;

  // minAge: number = 20;
  // maxAge: number = 70;
  minExperience: number = 0;
  maxExperience: number = 70;
  options: Options = {
    floor: 0,
    ceil: 100
  };



  private subscription: Subscription[] = [];



  constructor(
    public fb: FormBuilder,
    public country: CountriesService,
    public cv: CvBoxService,
    public router: Router,
    public alertService: AlertService,
    public loadingService: LoadingService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.cv.getCategories()


  }

  ngOnInit() {



    this.filterForm = this.fb.group({
      category: ['', Validators.required],
      departments: ['', Validators.required],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      marital: ['', [Validators.required]],
      military: ['', [Validators.required],]

    })


  }

  // public submit(): void {

  //   if (this.filterForm.valid) {
  //     console.log(this.filterForm.value)
  //     const { category, departments, gender, country, state, marital, military } = this.filterForm.value;
  //     this.cv.cvFilter(category, departments, gender, country, state, marital, military, this.minExperience, this.maxExperience);
  //     this.dialog.closeAll()
  //     // this.cv.cvs.subscribe(res => {
  //     this.router.navigate(['/users'])
  //     //   console.log(res)
  //     // })
  //   } else {
  //     console.log(false)
  //   }

  // }
  // this.router.navigate(['/display-profile-use'])





}
