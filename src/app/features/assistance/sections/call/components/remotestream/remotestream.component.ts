import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgoraService } from '@shared/services/agora.service';
import { AppState } from '@store/store';

@Component({
  selector: 'app-remotestream',
  standalone: true,
  imports: [],
  templateUrl: './remotestream.component.html',
  styleUrl: './remotestream.component.scss'
})
export class RemotestreamComponent {
  _store = inject(Store<AppState>);
  _agora = inject(AgoraService);
  call = this._store.selectSignal((state: AppState) => state.assistance.call);
  stream: any = this._store.selectSignal(
    (state: AppState) => state.shared.remoteStream
  );
  remote: any;
  constructor() {
    this.joinCall();
  }

  async joinCall() {    
    await this._agora.initLocalTracks();
    await this._agora.joinChannel(
      this.call()?.agora_data.app_id as any,
      this.call()?.agora_data.channel_name as any,
      this.call()?.agora_data.token
    );
  }
}
