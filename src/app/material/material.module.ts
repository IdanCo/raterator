import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialFileInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialFileInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDialogModule,
  ]
})
export class MaterialModule { }
