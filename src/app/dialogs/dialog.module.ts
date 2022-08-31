import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [DeleteDialogComponent, SelectProductImageDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogModule,
    FileUploadModule,
    MatCardModule,
  ],
})
export class DialogModule {}
