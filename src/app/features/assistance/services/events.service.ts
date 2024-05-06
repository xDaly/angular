import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketService } from '@shared/services/socket.service';
import { AppState } from '@store/store';

import {
  openToastr,
  setRemoteStream,
  setinCall,
} from '@shared/store/shared/shared.actions';
import { AgoraService } from '@shared/services/agora.service';
import { CALL_STATUS } from '@api/models/status.model';
import { SharedService } from '@shared/services/shared.service';
import {
  isReadyToCall,
  removeCustomer,
  setCall,
  setCallEnded,
  setCustomer,
} from '../store/assistance/assistance.actions';

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
  call = this._store.selectSignal((state: AppState) => state.assistance.call);
  constructor() {
    this.call_started();
    this.received_call_answered();
    this.received_call_canceled();
  }

  customer_call_invite() {
    this._socket.listen('customer_call_invite').subscribe((data: any) => {      
      this._store.dispatch(setCustomer({ customer: data }));
      this._store.dispatch(isReadyToCall({ readyToCall: true }));
    });
  }

  end_call() {
    this._socket.listen('end_call').subscribe((data: any) => {
      this._store.dispatch(setinCall({inCall: false}));
      this._store.dispatch(setCustomer({ customer: data }));
      this._store.dispatch(
        setRemoteStream({
          remoteStream: null,
        })
      );
    });
  }

  call_ended() {
    this._socket.listen('received_call_ended').subscribe(async (data: any) => {
      this._store.dispatch(setCallEnded());
      this._store.dispatch(setinCall({inCall: false}));
      this._store.dispatch(isReadyToCall({ readyToCall: true }));
      this._store.dispatch(
        setRemoteStream({
          remoteStream: null,
        })
      );
      await this._agora.leaveChannel();
    });
  }

  remove_from_list() {
    // this._socket.listen('received_call_ended').subscribe((data: any) => {
    //   this._store.dispatch(removeCustomer({ id: data.customer_id }));
    // });
  }

  staff_start_call() {
    // this._shared.audio.pause();
    const r = this._shared.generateRandomNumberBetween(1, 1000);
    setTimeout(() => {
      this._socket.emit('start_received_call', { id: this.userId() });
      this._store.dispatch(isReadyToCall({ readyToCall: false }));
    }, r);
  }

  call_started() {
    this._socket.listen('received_call_started').subscribe((data: any) => {
      this._store.dispatch(setinCall({inCall: true}));
      data.start_date = new Date().toString();
      this._store.dispatch(setCall({ call: data }));
    });
  }
  received_call_answered() {
    this._socket.listen('received_call_answered').subscribe((data: any) => {
      this._store.dispatch(removeCustomer({ id: data.customer_id }));
    });
  }
  received_call_canceled() {
    this._socket.listen('received_call_canceled').subscribe((data: any) => {
      this._store.dispatch(removeCustomer({ id: data.customer_id }));
    });
  }

  staff_end_call(status: any) {
    this._socket.emit('staff_end_received_call', {
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
    this._store.dispatch(
      setRemoteStream({
        remoteStream: null,
      })
    );
    this._store.dispatch(setinCall({inCall: false}));

    // this._store.dispatch(setInitializedCall({ call: null }));
    this._store.dispatch(isReadyToCall({ readyToCall: true }));
  }
}
