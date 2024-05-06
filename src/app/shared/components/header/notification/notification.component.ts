import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone : true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  public onnotifaction: boolean = false;

  notification() {
    this.onnotifaction = !this.onnotifaction
  }

}
