import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
// import { openDrawer ,closeDrawer} from 'src/app/shared/store/drawer/drawer.actions';

@Component({
  selector: 'app-user-video-chat',
  standalone: true,
  imports: [],
  templateUrl: './user-video-chat.component.html',
  styleUrl: './user-video-chat.component.scss',
})
export class UserVideoChatComponent {
  store = inject(Store<AppState>);

  // openDrawer() {
  //   this.store.dispatch(openDrawer());
  // }

}
