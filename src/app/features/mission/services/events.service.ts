import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketService } from '@shared/services/socket.service';
import { AppState } from '@store/store';
import {
  isReadyToCall,
  removeElementFromCustomers,
  setCallEnded,
  setCallStarted,
  setInitializedCall,
} from '../store/mission/mission.actions';
import { Call } from '../store/mission/mission.state';
import {
  openToastr,
  setRemoteStream,
  setinCall,
} from '@shared/store/shared/shared.actions';
import { AgoraService } from '@shared/services/agora.service';
import { CALL_STATUS } from '@api/models/status.model';
import { SharedService } from '@shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  _socket = inject(SocketService);
  _store = inject(Store<AppState>);
  _agora = inject(AgoraService);
  _shared = inject(SharedService);
  shift = this._store.selectSignal(
    (state: AppState) => state.mission.currentShift
  );
  userId = this._store.selectSignal((state: AppState) => state.user.user.id);
  call = this._store.selectSignal((state: AppState) => state.mission.call);
  constructor() {}

  staff_initialize_call() {
    this._socket.emit('staff_initialize_call', {
      shift: this.shift(),
      caller_id: this.userId(),
    });
  }

  staff_call_initialized() {
    this._socket
      .listen('staff_call_initialized')
      .subscribe((data: Call | string) => {
        if (data == 'no-match-found') {
          this._store.dispatch(
            openToastr({
              toastrType: 'error',
              toastrMessage: 'pas de clients pour appeler',
            })
          );
        } else {
          if (typeof data !== 'string') {
            // @ts-ignore
            const resp = { ...data };
            resp.start_date = new Date().toString();
            this._store.dispatch(setInitializedCall({ call: resp as Call }));
            this._store.dispatch(setinCall({inCall: true}));

            // this._store.dispatch(
            //   removeElementFromCustomers({ id: data.participants[0] })
            // );
          }
        }
      });
  }

  call_emitted() {
    this._socket.listen('call_emitted').subscribe((data: any) => {
      this._store.dispatch(
        removeElementFromCustomers({ id: data.customer_id })
      );
    });
  }

  call_started() {
    this._socket.listen('launched_call_started').subscribe((data: any) => {
      this._store.dispatch(setCallStarted());
    });
  }

  call_ended() {
    this._socket.listen('launched_call_ended').subscribe(async (data: any) => {
      this._store.dispatch(setCallEnded());
      this._store.dispatch(setinCall({inCall: false}));

      this._store.dispatch(
        removeElementFromCustomers({ id: data.customer_id })
      );
      this._store.dispatch(
        setRemoteStream({
          remoteStream: null,
        })
      );
      await this._agora.leaveChannel();
    });
  }

  staff_start_call() {
    this._socket.emit('staff_start_call', {});
  }

  staff_end_call(status: any) {
    this._socket.emit('staff_end_emitted_call', {
      call_id: this.call()?.call_id,
      caller_id: this.call()?.caller_id,
      ended_by: this.userId(),
      participants: this.call()?.participants,
      start_date: status == CALL_STATUS.MISSED ? null : this.call()?.start_date,
      end_date: status == CALL_STATUS.MISSED ? null : new Date(),
      duration: this._shared.getDifferenceInSeconds(
        this.call()?.start_date as string,
        new Date().toString()
      ),
      status: status,
    });
    this._store.dispatch(setInitializedCall({ call: null }));
    this._store.dispatch(isReadyToCall({ readyToCall: true }));
    this._store.dispatch(setinCall({inCall: false}));

    this._store.dispatch(
      setRemoteStream({
        remoteStream: null,
      })
    );
  }
}
