import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { SupChatComponent } from './components/sup-chat/sup-chat.component';
import { CommonModule } from '@angular/common';
import { EventsService } from '@features/mission/services/events.service';
import { AppState } from '@store/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SvgIconComponent, CommonModule, SupChatComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  isDisabled = false;
  history = [
    {
      name: 'Erica Hughes',
      type: 'incoming',
      date: '14 Février, 16:30',
    },
    {
      name: 'Vincent Porter',
      type: 'outgoing',
      date: '14 Février, 16:30',
    },
    {
      name: 'Erica Hughes',
      type: 'incoming',
      date: '14 Février, 16:30',
    },
    {
      name: 'Ginger Johnston',
      type: 'outgoing',
      date: '14 Février, 16:30',
    },
    {
      name: 'Erica Hughes',
      type: 'incoming',
      date: '14 Février, 16:30',
    },
  ];
  chatOpened = false;
  _events = inject(EventsService);
  _store = inject(Store<AppState>);

  isReadyToCall = this._store.selectSignal(
    (state: AppState) => state.mission.readyToCall
  );
  enableButton() {
    setTimeout(() => {
      this.isDisabled = false;
    }, 1000);
  }
}
