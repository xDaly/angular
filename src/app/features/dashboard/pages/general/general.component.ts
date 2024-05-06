import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgoraService } from '@shared/services/agora.service';
import AgoraRTC, { ICameraVideoTrack } from 'agora-rtc-sdk-ng';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';
import { NavservicesService } from 'src/app/shared/services/nav.service';
import { Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  template: `<video
    [id]="videoId"
    autoplay
    playsinline
    style="border:1px solid black;padding:10px;width:250px;height:250px"
  ></video> `,
})
export class VideoComponent implements OnChanges {
  @Input() track: any;
  @Input() videoId: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['track']) {
      // console.log('track', this.track);
    }
    if (changes['track'] && this.track) {
      this.displayVideo(this.track);
    }
  }

  async getMediaStreamTrack(
    agoraVideoTrack: ICameraVideoTrack
  ): Promise<MediaStreamTrack> {
    return agoraVideoTrack.getMediaStreamTrack();
  }

  async displayVideo(track: ICameraVideoTrack) {
    const mediaStreamTrack = await this.getMediaStreamTrack(track);
    const stream = new MediaStream([mediaStreamTrack]);
    const videoElement = document.getElementById(
      this.videoId
    ) as HTMLVideoElement;
    videoElement.srcObject = stream;
  }
}


@Component({
  selector: 'app-general',
  standalone: true,
  imports: [SvgIconComponent, CommonModule, FormsModule, VideoComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
})
export class GeneralComponent {
  agoraService = inject(AgoraService);

  time = new Date();
  options: any = {
    appId: '111e3a0206cf4a3997b6ba5e393a34a2',
    channel: 'samirlousif',
    token:
      '007eJxTYNBrV+hc6ZsRIdL4PPvo9rDd4ROEj3pUTXhtXJxf5t66gVWBwdDQMNU40cDIwCw5zSTR2NLSPMksKdE01djSONHYJNHohtyP1IZARoYqYUUmRgYIBPGZGBITGRgAoAkcvQ==',
    uid: null,
  };

  localVideoTrack: ICameraVideoTrack | null;
  remoteVideoTracks: any;
  constructor() {
    this.localVideoTrack = this.agoraService.getLocalVideoTrack();
    this.remoteVideoTracks = this.agoraService.getRemoteVideoTracks();
  }

  async joinCall() {
    // Use AgoraService to join call with provided details
    await this.agoraService.initLocalTracks();
    await this.agoraService.joinChannel(
      'b5d8bba83dba468f80712692493f1180',
      'test',
      '007eJxTYChdve9QinV9qGXgG5ZVG+6clY5fdeZb37e1j3Xf2L9iyotWYEgyTbFISkq0ME5JSjQxs0izMDA3NDKzNDKxNE4zNLQw8J33K7UhkJEhucGNkZEBAkF8FoaS1OISBgYA6YMhHQ=='
    );
  }

  async leaveCall() {
    // Use AgoraService to leave call
    await this.agoraService.leaveChannel();
  }
}
