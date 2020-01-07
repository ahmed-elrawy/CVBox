import { Component, OnInit } from '@angular/core';
import { Renderer } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireUploadTask, AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "../../classes/user";

import { MatDialog } from '@angular/material/dialog';

import { DialogOverviewCropeImgComponent } from 'src/app/components/dialog-overview-crope-img/dialog-overview-crope-img.component';


export interface DialogData {
  profileImg: 'image';
}



@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  public curentView: string = "resume-info";

  user: User
  userData
  task: AngularFireUploadTask;

  PDFURL: string | null;
  photoUrl: string

  constructor(
    private render: Renderer,
    private afStorage: AngularFireStorage,
    private db: AngularFirestore,
    private firestore: AngularFirestore,
    private auth: AuthService,
    public dialog: MatDialog
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));

  }


  openDialog() {
    this.dialog.open(DialogOverviewCropeImgComponent, {
      data: {
        profileImg: 'image'
      }
    });
  }



  ngOnInit() {
    this.db.doc<User>(`users/${this.user.uid}`).valueChanges().subscribe(
      user => {
        this.PDFURL = user.pdfUrl;
        this.photoUrl = user.photoUrl
        this.userData = user
        console.log(this.photoUrl)

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
    const filePath = 'cv/' + event.item(0).name;
    const fileRef = this.afStorage.ref(filePath);

    return new Promise<any>((resolve, reject) => {
      const task = this.afStorage.upload(filePath, event.item(0));

      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(
          res => resolve(
            this.firestore
              .collection("users")
              .doc(this.user.uid)
              .set({ filePath, pdfUrl: res }, { merge: true })

          ),
          err => reject(err))
        )
      ).subscribe();
    })
  }



  // resizeOptions: ResizeOptions = {
  //   resizeMaxHeight: 74,
  //   resizeMaxWidth: 74
  // };



}