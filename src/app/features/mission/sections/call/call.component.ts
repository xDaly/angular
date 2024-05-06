import { Component, effect, inject, input } from '@angular/core';
import { LocalstreamComponent } from './components/localstream/localstream.component';
import { RemotestreamComponent } from './components/remotestream/remotestream.component';
import { CallCounterComponent } from './components/call-counter/call-counter.component';
import { CallControlsComponent } from './components/call-controls/call-controls.component';
import { CallingComponent } from './components/calling/calling.component';
import { MovableAreaDirective } from '@shared/directives/movable-area.directive';
import { MovableDirective } from '@shared/directives/movable.directive';
import { Customer } from '@features/mission/store/mission/mission.state';
import { AppState } from '@store/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [
    LocalstreamComponent,
    RemotestreamComponent,
    CallCounterComponent,
    CallControlsComponent,
    MovableAreaDirective,
    MovableDirective,
    CallingComponent
  ],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss',
})
export class CallComponent {
customer = input.required<Customer>()
_store = inject(Store<AppState>);
isCallStarted = this._store.selectSignal((state: AppState) => state.mission.isCallStarted);
isCallEnded = this._store.selectSignal((state: AppState) => state.mission.isCallEnded);
constructor(){

}
  
}
