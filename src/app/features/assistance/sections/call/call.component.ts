import { Component, inject } from '@angular/core';
import { LocalstreamComponent } from './components/localstream/localstream.component';
import { RemotestreamComponent } from './components/remotestream/remotestream.component';
import { CallCounterComponent } from './components/call-counter/call-counter.component';
import { CallControlsComponent } from './components/call-controls/call-controls.component';
import { CallingComponent } from './components/calling/calling.component';
import { MovableAreaDirective } from '@shared/directives/movable-area.directive';
import { MovableDirective } from '@shared/directives/movable.directive';
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
    CallingComponent,
  ],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss',
})
export class CallComponent {
  _store = inject(Store<AppState>);
  call = this._store.selectSignal((state: AppState) => state.assistance.call);
}
