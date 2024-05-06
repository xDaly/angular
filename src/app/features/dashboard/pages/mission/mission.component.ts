import { Component } from '@angular/core';
import { ChatTabComponent } from '@features/dashboard/components/mission/chat-tab/chat-tab.component';
import { ChatsComponent } from '@features/dashboard/components/mission/chats/chats.component';
import { UserVideoChatComponent } from '@features/dashboard/components/mission/user-video-chat/user-video-chat.component';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [UserVideoChatComponent,ChatTabComponent,ChatsComponent],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss'
})
export class MissionComponent {

}
