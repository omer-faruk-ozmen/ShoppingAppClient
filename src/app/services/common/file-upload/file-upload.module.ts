import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { FileUploadComponent } from './file-upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from 'src/app/dialogs/dialog.module';

@NgModule({
  declarations: [FileUploadComponent, FileUploadDialogComponent],
  imports: [CommonModule, NgxFileDropModule, MatDialogModule, MatButtonModule],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
