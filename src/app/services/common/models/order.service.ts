import { Single_Order } from './../../../contracts/order/single_order';
import { List_Order } from './../../../contracts/order/list_order';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_Order } from './../../../contracts/order/create_order';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) { }

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'orders',
      },
      order
    );
    await firstValueFrom(observable);
  }

  async getAllOrders(page: number, size: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
    const observable: Observable<{ totalOrderCount: number; orders: List_Order[] }> = this.httpClientService.get(
      {
        controller: 'orders',
        queryString: `page=${page}&size=${size}`
      }
    );

    const promiseData = firstValueFrom(observable);
    promiseData.then( successCallBack)
      .catch(error => errorCallBack(error))

    return await promiseData;
  }

  async getOrderById(id:string,successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable:Observable<Single_Order> = this.httpClientService.get<Single_Order>({
    
      controller:"orders"
    },id);

    const promiseData=firstValueFrom(observable);

    promiseData.then(value=>successCallBack())
    .catch(error=>errorCallBack(error))

    return await promiseData;
  }

  async completeOrder(id:string,successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable:Observable<any> =this.httpClientService.get({
      controller:"orders",
      action:"complete-order"
    },id)

    const promiseData = firstValueFrom(observable);
    
    promiseData.then(value=>successCallBack())
    .catch(error=>errorCallBack(error));
    
    return await promiseData;
  }
}
