import { Update_Basket_Item } from 'src/app/contracts/basket/update-basket-item';
import { List_Basket_Item } from './../../../contracts/basket/list-basket-item';
import { BasketService } from './../../../services/common/models/basket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { hide } from '@popperjs/core';

declare var $:any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,private basketService:BasketService) {
    super(spinner);
  }

  basketItems:List_Basket_Item[]

 async ngOnInit() {
    this.showSpinner(SpinnerType.BallRunningDots)
    this.basketItems= await this.basketService.get()
    this.hideSpinner(SpinnerType.BallRunningDots)
  }


  async changeQuantity(object:any){
    this.showSpinner(SpinnerType.BallRunningDots)
    const basketItemId:string = object.target.attributes["id"].value;
    const quantity :number=object.target.value;
    const basketItem :Update_Basket_Item = new Update_Basket_Item;
    basketItem.basketItemId=basketItemId;
    basketItem.quantity=quantity;

    await this.basketService.updateQuantity(basketItem)
    this.hideSpinner(SpinnerType.BallRunningDots);
  }

  async removeBasketItem(basketItemId:string){
    this.showSpinner(SpinnerType.BallRunningDots);


    
    await this.basketService.remove(basketItemId);

    $("."+basketItemId).fadeOut(1500,()=>this.hideSpinner(SpinnerType.BallRunningDots));

    
  }


}
