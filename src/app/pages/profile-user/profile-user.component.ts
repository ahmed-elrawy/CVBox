import { Component, OnInit } from '@angular/core';
import { Renderer } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map, tap } from "rxjs/operators";
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  public curentView: string = "resume-info";

  usersRef: AngularFirestoreCollection<any>;
  data: Observable<any[]>;


  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;



  uploadPercent: Observable<number>;
  userdata: any = {}
  constructor(
    private render: Renderer,
    private auth: AuthService,
    private afStorage: AngularFireStorage,
    private db: AngularFirestore
  ) {


  }

  ngOnInit() {
    this.db.doc<any>(`users/${this.auth.userData.uid}`).valueChanges().subscribe(
      user => {
        this.userdata = user;

        console.log(this.userdata)
      }, (error) => {
        console.log(error);
      }
    );
  }

  view(key: string): void {
    if (key == "personal-info") {
      this.curentView = "personal-info"
      console.log(this.curentView)

    } if (key == "resume-info") {
      this.curentView = "resume-info"
      console.log(this.curentView)

    }
  }

  public listClick(event: any) {
    event.preventDefault();
    this.render.setElementClass(event.target, "active", true);
    // How to remove 'active' from siblings ?
  }

  startUpload(event: FileList) {
    const filePath = '/' + event.item(0).name;
    const fileRef = this.afStorage.ref(filePath);

    return new Promise<any>((resolve, reject) => {
      const task = this.afStorage.upload(filePath, event.item(0));

      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(
          res => resolve(
            this.usersRef.doc(this.auth.userData.uid).update({ filePath, pdfUrl: res })

          ),
          err => reject(err))
        )
      ).subscribe();
    })
  }

  // startUpload(event: FileList) {



  //   const file = event.item(0);
  //   const filePath = `ahmed.pdf`;

  //   this.afStorage.upload(`cvs/${filePath}`, file).task.snapshot.ref.getDownloadURL().then(downloadURL => {
  //     console.log(downloadURL);
  //     this.usersRef.doc(this.auth.userData.uid).update({ filePath, downloadURL }).then(task=>{

  //     })

  //   });


  //   // this.uploadPercent = task.percentageChanges();
  //   // get notified when the download URL is available


  //   // this.task.snapshotChanges().pipe(
  //   //   finalize(() => {
  //   //     this.downloadURL = fileRef.getDownloadURL()

  //   //     console.log(this.downloadURL)

  //   //   })

  //   // )
  //   //   .subscribe(url => {
  //   //     console.log(url.downloadURL + "url................")
  //   //   }
  //   //   )

  //   // this.snapshot = this.task.snapshotChanges().pipe(
  //   //   tap(snap => {
  //   //     if (snap.bytesTransferred === snap.totalBytes) {
  //   //       // Update firestore on completion
  //   //       // this.db.collection('users/' + this.auth.userData.uid).add({ filePath, size: snap.totalBytes })
  //   //       this.usersRef.doc(this.auth.userData.uid).update({ filePath, size: snap.totalBytes })
  //   //     }
  //   //   })
  //   // )
  // }




  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
