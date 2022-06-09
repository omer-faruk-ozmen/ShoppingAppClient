import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ShoppingAppClient';
  /**
   *
   */
  constructor(private toastrSErvice: CustomToastrService) {
    toastrSErvice.message('deneme', 'Deneme', {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomRight,
    });
    toastrSErvice.message('deneme', 'Deneme', {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomRight,
    });
  }
}
