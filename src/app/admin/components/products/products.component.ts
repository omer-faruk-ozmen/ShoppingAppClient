import { HttpClientService } from './../../../services/common/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallRunningDots);

    /*
    this.httpClientService
      .get<Product[]>({
        controller: 'products',
      })
      .subscribe((data) => console.log(data[0]));
*/
    /*
    this.httpClientService
      .post(
        { controller: 'products' },
        { name: 'Pencil', strock: 100, price: 15 }
      )
      .subscribe();
    */

    /*
    this.httpClientService
      .put(
        { controller: 'products' },
        {
          id: 'ffa505e3-b296-456d-811e-64fa5eea3c0a',
          name: 'Keyboard',
          stock: 60,
          price: 250,
        }
      )
      .subscribe();
      */

    /*
    this.httpClientService
      .delete(
        { controller: 'products' },
        '34986b0f-23bf-4688-84b7-1b58b149609f'
      )
      .subscribe();
      */

    /*
    this.httpClientService
      .get({
        baseUrl: 'https://jsonplaceholder.typicode.com',
        controller: 'posts',
      })
      .subscribe((data) => console.log(data));
      */
    /*
    this.httpClientService
      .get({
        fullEndPoint: 'https://jsonplaceholder.typicode.com/posts',
      })
      .subscribe((data) => console.log(data));
      */
  }
}
