import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../services/ui/custom-toastr.service';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { async } from '@angular/core/testing';
import { CompleteOrderDialogComponent, CompleteOrderState } from './../complete-order-dialog/complete-order-dialog.component';
import { DialogService } from './../../services/common/dialog/dialog.service';
import { Single_Order } from './../../contracts/order/single_order';
import { OrderService } from './../../services/common/models/order.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent>  implements OnInit {

  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService:OrderService,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService,
    private toastrService:CustomToastrService
  ) {
    super(dialogRef);
  }
  singleOrder:Single_Order;
  totalPrice:number;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();




  async ngOnInit(): Promise<void> {
    this.singleOrder= await this.orderService.getOrderById(this.data as string)
    this.dataSource=this.singleOrder.basketItems;

    this.totalPrice=this.singleOrder.basketItems.map((basketItem,index) =>basketItem.price*basketItem.quantity).reduce((price,current)=>price+current)
  }

  completeOrder(){
    this.dialogService.openDialog({
      componentType:CompleteOrderDialogComponent,
      data:CompleteOrderState.Yes,
      afterClosed:async ()=>{
        this.spinner.show(SpinnerType.BallRunningDots)
        await this.orderService.completeOrder(this.data as string,()=>{
          this.spinner.hide(SpinnerType.BallRunningDots)
          this.toastrService.message("Order completed and customer notified","Order completed successfully",{
            messageType:ToastrMessageType.Success,
            position:ToastrPosition.TopRight
          })
        },(errorMessage)=>{
          this.toastrService.message("An error was encountered, the order could not be completed","Order could not be completed",{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopRight
          })
        });
        
      }
    })
  }

}

export enum OrderDetailDialogState {
  Close,
  OrderComplate,
}


