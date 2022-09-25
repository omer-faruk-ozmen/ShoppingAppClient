import { async } from '@angular/core/testing';
import {
  BasketItemDeleteState,
  BasketItemRemoveDialogComponent,
} from './../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { DialogService } from './../../../services/common/dialog/dialog.service';
import { Router } from '@angular/router';
import { SignalRService } from './../../../services/common/signalr.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../../../services/ui/custom-toastr.service';
import { Create_Order } from './../../../contracts/order/create_order';
import { OrderService } from './../../../services/common/models/order.service';
import { Update_Basket_Item } from 'src/app/contracts/basket/update-basket-item';
import { List_Basket_Item } from './../../../contracts/basket/list-basket-item';
import { BasketService } from './../../../services/common/models/basket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  basketItems: List_Basket_Item[];
  totalPrice:number=0;

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallRunningDots);
    this.basketItems = await this.basketService.get();

    this.basketItems.forEach(element=>{
      this.totalPrice=this.totalPrice+(element.price*element.quantity);
    })

    this.hideSpinner(SpinnerType.BallRunningDots);
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallRunningDots);
    const basketItemId: string = object.target.attributes['id'].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallRunningDots);
  }

  async removeBasketItem(basketItemId: string) {
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallRunningDots);
        await this.basketService.remove(basketItemId);
        $('.' + basketItemId).fadeOut(1500, () =>
          this.hideSpinner(SpinnerType.BallRunningDots)
        );
      },
    });
  }

  async checkout() {
    this.showSpinner(SpinnerType.BallRunningDots);
    const order: Create_Order = new Create_Order();
    order.address = 'Test Address'; 
    order.description = 'Test Description';
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.BallRunningDots);
    this.toastrService.message('Order received', 'Order Created', {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    });
  }
}
