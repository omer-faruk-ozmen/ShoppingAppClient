import { HttpClientService } from './../../../services/common/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';

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
    this.httpClientService
      .get({
        controller: 'products',
      })
      .subscribe((data) => console.log(data));

    this.httpClientService.post(
      {
        controller: 'products',
      },
      {
        name: '',
      }
    );
  }
}
