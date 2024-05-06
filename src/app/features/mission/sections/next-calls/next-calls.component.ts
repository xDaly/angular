import { Component, effect, inject } from '@angular/core';
import { NextCallElementComponent } from './next-call-element/next-call-element.component';
import { CallElementComponent } from '../missed-calls/call-element/call-element.component';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeOutRight } from 'ng-animate';
import { AppState } from '@store/store';
import { Store } from '@ngrx/store';
import { removeElementFromCustomers } from '@features/mission/store/mission/mission.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.main';
import { API_ROUTES } from '@api/api.constants';
@Component({
  selector: 'app-next-calls',
  standalone: true,
  imports: [NextCallElementComponent, CallElementComponent],
  templateUrl: './next-calls.component.html',
  styleUrl: './next-calls.component.scss',
  animations: [
    trigger('fadeOutRight', [
      transition(
        ':leave',
        useAnimation(fadeOutRight, {
          params: {
            timing: 0.7,
            delay: 0,
          },
        })
      ),
    ]),
  ],
})
export class NextCallsComponent {
  mode = environment.mode || 'production';

  _store = inject(Store<AppState>);
  _http = inject(HttpClient);

  fadeOutRight: any;
  selectedMenu = 'outgoing';
  nextCalls = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 16, 18, 19, 19, 15,
    15, 32,
  ];

  ids = [
    '095988ac-5a77-48a9-acc3-25a7f2ade025',

    '479db60c-10f2-4bf8-945f-975c6b8c3969',

    '826a5881-a734-46c7-9a3f-45ca28eaa3a9',

    'be7ae508-f7c1-429b-b9c3-a8ff5b10d0cc',
  ];
  generateRandom = Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000;

  customers = this._store.selectSignal((state) => state.mission.customers);
  i = 0;
  constructor() {
    effect(() => {
      console.log(
        this.customers(),
        'this.customer from mission next calls component'
      );
    });
    // this._store.dispatch(removeElementFromCustomers({ id: this.ids[this.i] }));
  }
  removeFirstItem(e: any) {
    const index = this.nextCalls.indexOf(e);
    this.nextCalls.splice(index, 1);
  }

  resetShift() {
    this._http.post(API_ROUTES.MISSION.RESET_SHIFT, {}).subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
