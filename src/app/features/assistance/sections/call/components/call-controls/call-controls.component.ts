import { Component, inject, input } from '@angular/core';
import { CDN_URL } from '@api/api.constants';
import { EventsService } from '@features/assistance/services/events.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { EndCallInfoComponent } from '@shared/components/end-call-info/end-call-info.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { AgoraService } from '@shared/services/agora.service';
import { SharedService } from '@shared/services/shared.service';
import { AppState } from '@store/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-call-controls',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './call-controls.component.html',
  styleUrl: './call-controls.component.scss',
})
export class CallControlsComponent {
  call = input<any>();
  _store = inject(Store<AppState>);
  _agora = inject(AgoraService);
  _events = inject(EventsService);
  _shared = inject(SharedService);

  _ngbModal = inject(NgbModal);
  CDN_URL = CDN_URL;
  hangup() {
    const modal = this._ngbModal.open(EndCallInfoComponent);   
    modal.componentInstance.call = _.cloneDeep({
      name:
        this.call()?.customer.first_name +
        ' ' +
        this.call()?.customer.last_name,
      image: `${CDN_URL}/uploads/customer/${this.call()?.customer.id}.webp`,
      duration: this.duration(),
      id: this.call()?.customer.registration_number,
    });

    this._events.staff_end_call('completed');
  }

  duration() {
    return this._shared.getDifferenceInSeconds(
      this.call()?.start_date as string,
      new Date().toString()
    );
  }
}
