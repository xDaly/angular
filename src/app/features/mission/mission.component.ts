import { Component, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setName, setNameStorage } from '@shared/store/storage/storage.actions';
import { AppState } from '@store/store';
import { stopLocalStream } from './store/mission/mission.actions';
import { MissedCallsComponent } from './sections/missed-calls/missed-calls.component';
import { MainComponent } from './sections/main/main.component';
import { NextCallsComponent } from './sections/next-calls/next-calls.component';
import { CallComponent } from './sections/call/call.component';
import { openToastr } from '@shared/store/shared/shared.actions';
import { MissingCallToastComponent } from '@shared/components/missing-call-toast/missing-call-toast.component';
import { ReportComponent } from './sections/report/report.component';
import { MissionService } from './services/mission.service';
import { filter } from 'rxjs';
import { EventsService } from './services/events.service';
import { selectCustomerById } from './store/mission/mission.reducer';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [
    MissedCallsComponent,
    MissingCallToastComponent,
    MainComponent,
    NextCallsComponent,
    ReportComponent,
    CallComponent,
  ],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss',
})
export class MissionComponent {
  MissingCallToastComponent = MissingCallToastComponent;
  _store = inject(Store<AppState>);
  _mission = inject(MissionService);
  _events = inject(EventsService);
  name = this._store.selectSignal((state: AppState) => state.storage.name);
  stream = this._store.selectSignal(
    (state: AppState) => state.mission.localStream
  );
  currentShift$$ = this._store.select((state) => state.mission.currentShift);
  mission = this._store.selectSignal((state: AppState) => state.mission);
  customer: any;
  constructor() {
    this._mission.getShifts();
    this.initializeData();
    this._events.staff_call_initialized();
    this._events.call_started();
    this._events.call_ended();
    this._events.call_emitted();
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
    effect(() => {
      this.customer = this._store.selectSignal(
        selectCustomerById(this.mission().call?.participants[0] as string)
      );
      console.log(this.customer());
      
      
    });
  }
  ngOnInit() {}
  addName() {
    const name = this.generateRandomName(5);
    this._store.dispatch(setNameStorage({ name: name }));
  }

  initializeData() {
    this.currentShift$$
      .pipe(filter((shift) => shift !== ''))
      .subscribe((shift) => {
        this._mission.getScheduleByShift(shift);
      });
  }

  stopLocalStream() {
    this._store.dispatch(stopLocalStream());
  }

  generateRandomName(n: number) {
    return Math.random()
      .toString(36)
      .substring(2, 2 + n);
  }
}
