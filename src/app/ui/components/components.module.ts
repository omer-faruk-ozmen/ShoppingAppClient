

import { BasketsComponent } from './baskets/baskets.component';
import { RegisterModule } from './register/register.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { UpdatePasswordComponent } from './password/update-password/update-password.component';
import { PasswordResetModule } from './password/password-reset/password-reset.module';
import { UpdatePasswordModule } from './password/update-password/update-password.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    ProductsModule,
    BasketsModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule
  ],
  exports:[]
})
export class ComponentsModule {}
