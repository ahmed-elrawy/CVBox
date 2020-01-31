import { NgModule } from '@angular/core';
import * as Material from '@angular/material'
import { MatDialogRef } from '@angular/material';

const material = [
  Material.MatButtonModule,
  Material.MatToolbarModule,
  Material.MatGridListModule,
  Material.MatFormFieldModule,
  Material.MatInputModule,
  Material.MatRadioModule,
  Material.MatSelectModule,
  Material.MatCheckboxModule,
  Material.MatDatepickerModule,
  Material.MatNativeDateModule,
  Material.MatSnackBarModule,
  Material.MatTableModule,
  Material.MatIconModule,
  Material.MatSortModule,
  Material.MatPaginatorModule,
  Material.MatDialogModule,
  Material.MatStepperModule,
  Material.MatDialogModule,
  Material.MatExpansionModule,
  Material.MatCardModule

]
@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
