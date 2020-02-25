import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from "@angular/fire/firestore";
import { LoadingService } from 'src/app/servies/loading.service';

import { AuthService } from 'src/app/services/auth.service';
import { User } from "../../classes/user";

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-dialog-overview-crope-img',
  templateUrl: './dialog-overview-crope-img.component.html',
  styleUrls: ['./dialog-overview-crope-img.component.scss']
})
export class DialogOverviewCropeImgComponent {

  imageIsReady: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  containWithinAspectRatio = false;

  user: User

  @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewCropeImgComponent>,
    private afStorage: AngularFireStorage,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private auth: AuthService,
    private loadingService: LoadingService,

    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.user = this.auth.userData
  }








  uploadImageToStorage(base64Data): AngularFireUploadTask {
    //let path='THIS WILL BE YOUR IMAGE NAME AND PATH';
    // `cv/${this.user.user_id}/${event.item(0).name}`
    let path = ` profile/${this.auth.userData.user_id}/ profile-Image.jpg `;
    var imageRef = this.afStorage.ref(path);
    return imageRef.putString(base64Data, 'data_url');

  }


  async updatePhoto() {
    this.loadingService.isLoading.next(true)
    try {
      let progressResult = this.uploadImageToStorage(this.croppedImage);
      progressResult.percentageChanges()
        .subscribe({
          next: value => {
            let progress = Math.floor(value);
          },
          error: err => console.error(err),
          complete: () => this.loadingService.isLoading.next(false)
        })
      //You can get the image upload progress in here.        

      this.dialog.closeAll()
      this.showCropper = false;
      let result = await progressResult;
      let imageUrl = await result.ref.getDownloadURL();// the public access url of the image
      let imagePath = result.ref.fullPath;// the storage path of the image

      this.firestore
        .collection("users")
        .doc(this.user.user_id)
        .set({ imagePath, profile_image: imageUrl }, { merge: true })

    } catch (err) {
      err => console.log(err)//handle error
    }
  }

  fileChangeEvent(event: any): void {
    let text = '' + event.target.value
    if (text.includes("jpg") || text.includes("png") || text.includes("jpeg")) {
      this.imageChangedEvent = event;
    } else {
      alert(`You cannot upload that file type !! 
      You must upload only image`)
    }


  }

  imageCropped(event: ImageCroppedEvent) {
    // event.base64.includes("image")
    this.croppedImage = event.base64;
    // this.getImage(event.base64)


  }




  imageLoaded() {
    this.showCropper = true;
    this.imageIsReady = true
  }

  cropperReady() {
    this.imageIsReady = false

  }

  loadImageFailed() {

  }

  rotateLeft() {
    this.imageCropper.rotateLeft();

  }

  rotateRight() {
    this.imageCropper.rotateRight();
  }

  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }

  flipVertical() {
    this.imageCropper.flipVertical();
  }

  resetImage() {
    this.imageCropper.resetImage();
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }






}
