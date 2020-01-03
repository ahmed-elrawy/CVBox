import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CvBoxService {
  public categories: Observable<any>;
  // public departments: Observable<any>;
  loading: boolean = false
  departmentCollection: AngularFirestoreCollection<any>;
  departments: Observable<any[] | string>

  usersCollections: AngularFirestoreCollection<any>;
  users: Observable<any[]>
  userdata: any = {}
  constructor(
    private auth: AuthService,
    private db: AngularFirestore,

  ) {


    this.categories = this.db.collection<any>('categories').valueChanges()
    // this.departments = this.db.collection<any>('departments').valueChanges()

    this.categories.subscribe(res => this.loading = false)
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
        .where('category', '==', id)

    });
    this.users = this.usersCollections.valueChanges();
  }


  fun() {



    this.departmentCollection = this.db.collection('departments', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('category_id', '==', this.userdata.category)
    });
    this.departments = this.departmentCollection.valueChanges();

  }
}
