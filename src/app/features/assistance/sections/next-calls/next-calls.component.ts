import { Component, inject } from '@angular/core';
import { NextCallElementComponent } from './next-call-element/next-call-element.component';
import { CallElementComponent } from '../missed-calls/call-element/call-element.component';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeOutRight } from 'ng-animate';
import { AppState } from '@store/store';
import { Store } from '@ngrx/store';
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
  _store = inject(Store<AppState>);
  fadeOutRight: any;
  empty = false
  selectedMenu = 'outgoing';
  nextCalls = this._store.selectSignal((state: AppState) => state.assistance.customers);
  generateRandom = Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000;

  constructor() {}

  checkEmptyList(){
    if (this.nextCalls.length == 0) {
      this.empty = true
    }
  }
}
