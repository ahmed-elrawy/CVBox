import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { User } from '../classes/user';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CvBoxService {

  private loadState = new BehaviorSubject(true);
  currentLoadState = this.loadState.asObservable();

  categoriesCollection: AngularFirestoreCollection<any>
  categories: Observable<any[]> | null

  departmentCollection: AngularFirestoreCollection<any>;
  departments: Observable<any[] | string>

  usersCollections: AngularFirestoreCollection<any>;
  users: Observable<User[]>

  constructor(
    private db: AngularFirestore
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
    this.users = this.usersCollections.valueChanges();

  }



}
