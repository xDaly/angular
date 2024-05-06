import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { SupChatComponent } from './components/sup-chat/sup-chat.component';
import { CommonModule } from '@angular/common';
import { EventsService } from '@features/assistance/services/events.service';
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
  remoteStream = this._store.selectSignal(
    (state: AppState) => state.shared.remoteStream
  );

  customers = this._store.selectSignal(
    (state: AppState) => state.assistance.customers
  );
  readyToCall = this._store.selectSignal(
    (state: AppState) => state.assistance.readyToCall
  );
}
