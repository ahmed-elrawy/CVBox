import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { User } from '../classes/user';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CvBoxService {



  private dataSource: BehaviorSubject<any[]> = new BehaviorSubject([]);
  data = this.dataSource.asObservable();


  private loadState = new BehaviorSubject(true);
  currentLoadState = this.loadState.asObservable();

  categoriesCollection: AngularFirestoreCollection<any>
  categories: Observable<any[]> | null

  departmentCollection: AngularFirestoreCollection<any>;
  departments: Observable<any[] | string>

  usersCollections: AngularFirestoreCollection<any>;
  users: Observable<User[]>

  cvs: Observable<any[]> | null


  constructor(
    private db: AngularFirestore,
    public dialog: MatDialog,
    private router: Router,


  ) {


    this.categories = this.db.collection<any>('categories').valueChanges()
    this.getCategories()

  }

  getCategories() {
    this.categoriesCollection = this.db.collection('categories')
    this.categories = this.categoriesCollection.valueChanges()
    this.categories.subscribe(res => {
      this.loadState.next(false)

    })

  }



  getDepartments(id) {
    this.departmentCollection = this.db.collection('departments', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('category_id', '==', id)
    });
    this.departments = this.departmentCollection.valueChanges();

  }

  getUsers(id) {

    this.usersCollections = this.db.collection('users', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('departments', '==', id)

    });
    this.data = this.usersCollections.valueChanges();

  }

  cvFilter(category, departments, gender, country, state, marital, military, minExprience, maxExprience) {
    this.usersCollections = this.db.collection('users', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('category', '==', category)
        .where('departments', '==', departments)
        .where('year_experience', '<', maxExprience)
        .where('year_experience', '>', minExprience)
        .where('gender', '==', gender)
        .where('country', '==', country)
        .where('state', '==', state)
        .where('marital', '==', marital)
        .where('military', '==', military)
    });
    this.data = this.usersCollections.valueChanges()

    // this.data.subscribe(res => {
    //   this.updatedDataSelection(res);
    //   this.loadState.next(false)

    //   console.log(res)
    // })
  }

  updatedDataSelection(data: any) {
    this.dataSource.next(data);
  }



  public submit(filterForm, minExperience, maxExperience): void {

    if (filterForm.valid) {
      console.log(filterForm.value)
      const { category, departments, gender, country, state, marital, military } = filterForm.value;
      this.cvFilter(category, departments, gender, country, state, marital, military, minExperience, maxExperience);

      this.dialog.closeAll()
      // this.cv.cvs.subscribe(res => {
      this.router.navigate(['/users'])
      //   console.log(res)
      // })
    } else {
      console.log(false)
    }

  }

}



