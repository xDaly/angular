import { Component, inject, input } from '@angular/core';
import { CDN_URL } from '@api/api.constants';
import { CALL_STATUS } from '@api/models/status.model';
import { EventsService } from '@features/mission/services/events.service';
import { Customer } from '@features/mission/store/mission/mission.state';
import { Store } from '@ngrx/store';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { FallbackSvgDirective } from '@shared/pipes/fallbackimage.pipe';
import { AgoraService } from '@shared/services/agora.service';
import { AppState } from '@store/store';

@Component({
  selector: 'app-calling',
  standalone: true,
  imports: [SvgIconComponent,FallbackSvgDirective],
  templateUrl: './calling.component.html',
  styleUrl: './calling.component.scss',
})
export class CallingComponent {
  CDN_URL = CDN_URL;
  customer = input.required<any>();
  _store = inject(Store<AppState>);
  _agora = inject(AgoraService);
  _events = inject(EventsService);
  hangup() {
    this._events.staff_end_call('canceled');
  }
}
