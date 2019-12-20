import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class CvBoxService {
  public categories: Observable<any>;
  // public departments: Observable<any>;

  departmentCollection: AngularFirestoreCollection<any>;
  departments: Observable<any[]>

  usersCollections: AngularFirestoreCollection<any>;
  users: Observable<any[]>

  constructor(
    private db: AngularFirestore,

  ) {
    this.categories = this.db.collection<any>('categories').valueChanges();
    // this.departments = this.db.collection<any>('departments').valueChanges()

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


}
