import { Component, inject } from '@angular/core';
import { CALL_STATUS } from '@api/models/status.model';
import { EventsService } from '@features/mission/services/events.service';
import { Store } from '@ngrx/store';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { AgoraService } from '@shared/services/agora.service';
import { AppState } from '@store/store';

@Component({
  selector: 'app-call-controls',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './call-controls.component.html',
  styleUrl: './call-controls.component.scss',
})
export class CallControlsComponent {
  _store = inject(Store<AppState>);
  _agora = inject(AgoraService);
  _events = inject(EventsService);
  hangup() {
    this._events.staff_end_call('completed');
  }
}
