import { Component, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setName, setNameStorage } from '@shared/store/storage/storage.actions';
import { AppState } from '@store/store';
import { MissedCallsComponent } from './sections/missed-calls/missed-calls.component';
import { MainComponent } from './sections/main/main.component';
import { NextCallsComponent } from './sections/next-calls/next-calls.component';
import { CallComponent } from './sections/call/call.component';
import { openToastr } from '@shared/store/shared/shared.actions';
import { MissingCallToastComponent } from '@shared/components/missing-call-toast/missing-call-toast.component';
import { EventsService } from './services/events.service';
import { ReportComponent } from '@features/mission/sections/report/report.component';
import { AssistanceService } from './services/assistance.service';
import {
  isReadyToCall,
  setCustomer,
} from './store/assistance/assistance.actions';

@Component({
  selector: 'app-assistance',
  standalone: true,
  imports: [
    MissedCallsComponent,
    MissingCallToastComponent,
    MainComponent,
    NextCallsComponent,
    ReportComponent,
    CallComponent,
  ],
  templateUrl: './assistance.component.html',
  styleUrl: './assistance.component.scss',
})
export class AssistanceComponent {
  MissingCallToastComponent = MissingCallToastComponent;
  _store = inject(Store<AppState>);
  _assistance = inject(AssistanceService);
  _events = inject(EventsService);
  name = this._store.selectSignal((state: AppState) => state.storage.name);

  call = this._store.selectSignal((state: AppState) => state.assistance.call);
  constructor() {

    this._events.call_ended();
    // setInterval(() => {
    //   this._store.dispatch(
    //     openToastr({
    //       toastrType: 'missedCall',
    //       toastrMessage: '',
    //       id: '1DJFZ659AZDF56EDFZ6',
    //       name: 'John Doe',
    //       component: this.MissingCallToastComponent,

    //     })
    //   );
    // }, 1000);
  }
  ngOnInit() {}
  addName() {
    const name = this.generateRandomName(5);
    this._store.dispatch(setNameStorage({ name: name }));
  }

  stopLocalStream() {}

  generateRandomName(n: number) {
    return Math.random()
      .toString(36)
      .substring(2, 2 + n);
  }

  getPeer() {
    // this._peer.getPeer();
  }
}
