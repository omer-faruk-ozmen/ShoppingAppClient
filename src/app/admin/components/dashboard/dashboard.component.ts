import { Component, OnInit } from '@angular/core';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {
    this.alertify.dismiss();
  }
  m() {
    this.alertify.message('Deneme', {
      messageType: MessageType.Success,
      delay: 5,
      position: Position.TopRight,
    });
  }
  d() {
    this.alertify.dismiss();
  }
}
