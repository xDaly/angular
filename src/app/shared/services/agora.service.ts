import { Injectable, inject } from '@angular/core';

import { isReadyToCall as isReadyToCallMission, setInitializedCall } from '@features/mission/store/mission/mission.actions';
import { isReadyToCall as isReadyToCallAssistance } from '@features/assistance/store/assistance/assistance.actions';
import { setCallEnded as setCallEndedMission } from '@features/mission/store/mission/mission.actions';
import { setCallEnded as setCallEndedAssistance } from '@features/assistance/store/assistance/assistance.actions';

import { Store } from '@ngrx/store';
import { setRemoteStream } from '@shared/store/shared/shared.actions';
import { AppState } from '@store/store';
import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import { SocketService } from './socket.service';
import { CALL_STATUS } from '@api/models/status.model';
import { SharedService } from './shared.service';
@Injectable({
  providedIn: 'root',
})
export class AgoraService {
  _store = inject(Store<AppState>);
  _shared = inject(SharedService);
  _socket = inject(SocketService);
  client: IAgoraRTCClient;

  userId = this._store.selectSignal((state: AppState) => state.user.user.id);
  call = this._store.selectSignal((state: AppState) => state.assistance.call);

  localTracks: {
    videoTrack: ICameraVideoTrack | null;
    audioTrack: IMicrophoneAudioTrack | null;
  } = {
    videoTrack: null,
    audioTrack: null,
  };
  remoteUsers: { [uid: string]: any } = {};
  remoteUsersArray: any[] = [];

  constructor() {
    AgoraRTC.setLogLevel(4);
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    this.handleUserPublished = this.handleUserPublished.bind(this);
    this.handleUserUnpublished = this.handleUserUnpublished.bind(this);
  }

  async initLocalTracks(): Promise<void> {
    this.localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    this.localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
  }

  async joinChannel(
    appId: string,
    channel: string,
    token?: string,
    uid?: string | number | null
  ): Promise<void> {
    this.client.on('user-published', this.handleUserPublished);
    this.client.on('user-unpublished', this.handleUserUnpublished);
    // this.client.on('user-left', (curState, reason) => {
    //   if (reason != 'Quit') {
    //     this._store.dispatch(setInitializedCall({ call: null }));
    //     this._store.dispatch(isReadyToCallMission({ readyToCall: true }));
    //     this._store.dispatch(isReadyToCallAssistance({ readyToCall: true }));
    //     this._store.dispatch(setCallEndedMission());
    //     this._store.dispatch(setCallEndedAssistance());

    //     this._socket.emit('staff_end_received_call', {
    //       call_id: this.call()?.call_id,
    //       caller_id: this.call()?.caller_id,
    //       ended_by: this.userId(),
    //       participants: this.call()?.participants,
    //       start_date: this.call()?.start_date,
    //       end_date: new Date(),
    //       duration: this._shared.getDifferenceInSeconds(
    //         this.call()?.start_date as string,
    //         new Date().toString()
    //       ),
    //       status: 'disconnected',
    //     });
    //     this._socket.emit('staff_end_emitted_call', {
    //       call_id: this.call()?.call_id,
    //       caller_id: this.call()?.caller_id,
    //       ended_by: this.userId(),
    //       participants: this.call()?.participants,
    //       start_date: this.call()?.start_date,
    //       end_date: new Date(),
    //       duration: this._shared.getDifferenceInSeconds(
    //         this.call()?.start_date as string,
    //         new Date().toString()
    //       ),
    //       status: 'disconnected',
    //     });
    //   }
    // });

    await this.client.join(appId, channel, token || null, uid || null);
    await this.publishLocalTracks();
  }

  async leaveChannel(): Promise<void> {
    if (this.localTracks.videoTrack) {
      this.localTracks.videoTrack.stop();
      this.localTracks.videoTrack.close();
      this.localTracks.videoTrack = null;
    }

    if (this.localTracks.audioTrack) {
      this.localTracks.audioTrack.stop();
      this.localTracks.audioTrack.close();
      this.localTracks.audioTrack = null;
    }

    await this.client.leave();
  }

  async publishLocalTracks(): Promise<void> {
    if (this.localTracks.audioTrack && this.localTracks.videoTrack) {
      await this.client.publish([
        this.localTracks.audioTrack,
        this.localTracks.videoTrack,
      ]);
    }
  }

  async handleUserPublished(user: any, mediaType: any): Promise<void> {
    // console.log('user', user);

    await this.client.subscribe(user, mediaType);
    if (mediaType === 'video') {
      const remoteVideoTrack = user.videoTrack;
      this.remoteUsers[user.uid] = remoteVideoTrack;
      const remoteStream = await this.getStreamFromTrack(remoteVideoTrack);
      console.log('rrr', remoteStream);

      this._store.dispatch(
        setRemoteStream({
          remoteStream: remoteStream,
        })
      );
      // console.log('remoteUsers', this.remoteUsers);

      // Emit event or update state to render remote video in component
    }

    if (mediaType === 'audio') {
      user.audioTrack.play(); // Play the audio
    }
  }

  handleUserUnpublished(user: any): void {
    delete this.remoteUsers[user.uid];
    // Update UI or state to remove remote user video

    this._store.dispatch(
      setRemoteStream({
        remoteStream: null,
      })
    );
  }
  getLocalVideoTrack(): ICameraVideoTrack | null {
    return this.localTracks.videoTrack;
  }

  getRemoteVideoTracks(): { [uid: string]: ICameraVideoTrack } {
    const remoteVideoTracks: { [uid: string]: ICameraVideoTrack } = {};
    Object.keys(this.remoteUsers).forEach((uid) => {
      const user = this.remoteUsers[uid];
      if (user.videoTrack) {
        remoteVideoTracks[uid] = user.videoTrack;
      }
    });
    return remoteVideoTracks;
  }

  async getStreamFromTrack(track: ICameraVideoTrack) {
    const mediaStreamTrack = track.getMediaStreamTrack();
    const stream = new MediaStream([mediaStreamTrack]);
    return stream;
  }
}
