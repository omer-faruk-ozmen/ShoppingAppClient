import { DeleteDirective } from './delete.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DeleteDirective],
  imports: [
    CommonModule
  ]
  ,exports:[DeleteDirective]
})
export class DeleteModule { }
