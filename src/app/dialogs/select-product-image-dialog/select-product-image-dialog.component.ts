import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from './../../services/common/dialog/dialog.service';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Product_Image } from './../../contracts/list_product_image';
import { ProductService } from './../../services/common/models/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { MatCard } from '@angular/material/card';
import { async } from '@angular/core/testing';

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent
  extends BaseDialog<SelectProductImageDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef);
  }
  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallRunningDots);
    this.images = await this.productService.readImages(
      this.data as string,
      () => this.spinner.hide(SpinnerType.BallRunningDots)
    );
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png,.jpg,.jpeg',
    action: 'upload',
    controller: 'products',
    explanation: 'Select or drag the product images to the field.',
    isAdminPage: true,
    queryString: `id=${this.data}`,
  };

  async deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallRunningDots);
        await this.productService.deleteImage(
          this.data as string,
          imageId,
          () => {
            this.spinner.hide(SpinnerType.BallRunningDots);
            var card = $(event.srcElement).parent().parent().parent();
            card.fadeOut(500);
          }
        );
      },
    });
  }
}

export enum SelectProductImageState {
  Close,
}
