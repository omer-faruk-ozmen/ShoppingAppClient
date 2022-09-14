import { BasketsComponent } from './baskets/baskets.component';
import { RegisterModule } from './register/register.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProductsModule,
    BasketsModule,
    RegisterModule,
  ],
  exports:[]
})
export class ComponentsModule {}
