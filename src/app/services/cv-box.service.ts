import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class CvBoxService {
  public category: any
  public test: Observable<any>;
  public departments

  public selectedCategory: Observable<any>;
  public changeCategory: BehaviorSubject<string | null> = new BehaviorSubject(null);


  constructor(
    private db: AngularFirestore,

  ) {

    this.test = this.db.collection<any>('categories').valueChanges();

    this.db.collection<any>('departments').valueChanges()
      .subscribe(res => {
        this.departments = res
      });

    // this.db.collection<any>('categories').valueChanges()
    //   .subscribe(rea => {
    //     this.category = rea
    //     console.log(this.category)
    //   });


  }
}
