import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, Output } from '@angular/core';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string
  ) {
    super(dialogRef);
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png,.jpg,.jpeg',
    action: 'upload',
    controller: 'products',
    explanation: 'Select or drag the product images to the field.',
    isAdminPage: true,
    queryString: `id=${this.data}`,
  };
}

export enum SelectProductImageState {
  Close,
}
