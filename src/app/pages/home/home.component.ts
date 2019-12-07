import { Component, OnInit } from '@angular/core';
import { CvBoxService } from 'src/app/services/cv-box.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser: User = null;

  category: boolean = true
  department: boolean = false
  user: boolean = false;
  departments: Observable<any[]>;


  itemCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>
  usersCollections: AngularFirestoreCollection<any>;
  users: Observable<any[]>
  constructor(
    public cv: CvBoxService,
    public db: AngularFirestore,
    public auth: AuthService) {


  }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })

  }



  console(id) {
    this.department = !this.department
    this.category = !this.category
    this.itemCollection = this.db.collection('departments', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('category_id', '==', id)

    });
    this.items = this.itemCollection.valueChanges();

    console.log(this.items)
    console.log(this.itemCollection)
  }

  userconsole(id) {
    this.department = false
    this.category = false
    this.user = true
    this.usersCollections = this.db.collection('users', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('category', '==', id)

    });
    this.users = this.usersCollections.valueChanges();

    console.log(this.users)
    console.log(this.usersCollections)
  }

}
