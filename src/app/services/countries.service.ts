import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Countries {
  id: string;
  name: string;
  priority: number;
}

interface States {
  country_id: string;
  id: string;
  name: string;
  priority: number
}

@Injectable({
  providedIn: 'root'
})


export class CountriesService {
  countriesCollection: AngularFirestoreCollection<Countries>
  countries: Observable<Countries[]>
  statesCollection: AngularFirestoreCollection<States>
  states: Observable<States[]>


  usersCollections: AngularFirestoreCollection<any>;
  users: Observable<any[]>



  constructor(private db: AngularFirestore) {
    this.countriesCollection = this.db.collection('countries')
    this.countries = this.countriesCollection.valueChanges()

    // this.statesCollection = this.db.collection(`states`)
    // this.states = this.statesCollection.valueChanges()
  }


  onChangeCountry(id) {

    this.statesCollection = this.db.collection('states', ref => {
      // Compose a query using multiple .where() methods
      return ref
        .where('country_id', '==', id)

    });
    this.states = this.statesCollection.valueChanges();
  }

}
