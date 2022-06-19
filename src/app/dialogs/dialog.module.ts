import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DeleteDialogComponent, FileUploadDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatDialogModule],
})
export class DialogModule {}
