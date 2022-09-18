import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.scss']
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent> {

  constructor(dialogRef:MatDialogRef<BasketItemRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:BasketItemDeleteState) {
    super(dialogRef)
   }
  ngOnInit(): void {
  }
}


export enum BasketItemDeleteState{
  Yes,
  No
}