import { Observable, firstValueFrom } from 'rxjs';
import { Create_Order } from './../../../contracts/order/create_order';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) {}

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'orders',
      },
      order
    );
    await firstValueFrom(observable);
  }
}
