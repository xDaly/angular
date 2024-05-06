import { Component, inject } from '@angular/core';
import { setLocalStream } from '@features/mission/store/mission/mission.actions';
import { Store } from '@ngrx/store';
import { AgoraService } from '@shared/services/agora.service';
import { AppState } from '@store/store';

@Component({
  selector: 'app-localstream',
  standalone: true,
  imports: [],
  templateUrl: './localstream.component.html',
  styleUrl: './localstream.component.scss',
})
export class LocalstreamComponent {
  _agora = inject(AgoraService);
  _store = inject(Store<AppState>);
  
  stream: any;

  ngAfterViewInit() {
    this.getLocalStream()
  }
  async getStream() {
    const stream = await this._agora.getStreamFromTrack(
      this._agora.getLocalVideoTrack() as any
    );
    // console.log('stream', stream);
    this.stream = stream;
  }

  async getLocalStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    this._store.dispatch(setLocalStream({ localStream: stream }));

    this.stream = stream;
  }
  ngOnDestroy() {
    this.stream.getTracks().forEach((track: any) => {
      track.stop();
    });
  }
}
