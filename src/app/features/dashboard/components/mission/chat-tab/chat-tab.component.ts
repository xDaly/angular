import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileTabComponent } from '../profile-tab/profile-tab.component';

@Component({
  selector: 'app-chat-tab',
  standalone: true,
  imports: [NgbNavModule,ProfileTabComponent],
  templateUrl: './chat-tab.component.html',
  styleUrl: './chat-tab.component.scss'
})
export class ChatTabComponent {
  public active = 1;
chatuser =  [
  {
    img: 'assets/images/user/4.jpg',
    user: 'Erica Hughes',
    date: '5 May, 4:40 PM',
    callType: "fshare",
    callTypeColor: "success"
  }]
}
