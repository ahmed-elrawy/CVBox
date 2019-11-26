import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CvBoxService {
  public selectedCategory: Observable<any>;
  public changeCategory: BehaviorSubject<string | null> = new BehaviorSubject(null);


  constructor(
    private db: AngularFirestore,

  ) {
    this.selectedCategory = this.changeCategory.pipe(
      switchMap(chatroomId => {
        if (chatroomId) {
          // this.loadingService.isLoading.next(true)
          return db.doc(`chatRooms/${chatroomId}`).valueChanges();
        }
        return of(null);
      }))
  }
}
