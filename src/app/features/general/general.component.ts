import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgoraService } from '@shared/services/agora.service';
import AgoraRTC, { ICameraVideoTrack } from 'agora-rtc-sdk-ng';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';
import { NavservicesService } from 'src/app/shared/services/nav.service';
import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import html2canvas from 'html2canvas';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppState } from '@store/store';
import { Store } from '@ngrx/store';
import { GeneralService } from './services/general.service';
import { setWeather } from '@shared/store/shared/shared.actions';

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
  imports: [
    SvgIconComponent,
    CommonModule,
    FormsModule,
    VideoComponent,
    CalendarComponent,
  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
})
export class GeneralComponent {
  @ViewChild('combinedCanvas') combinedCanvas: ElementRef<HTMLCanvasElement>;
  _store = inject(Store<AppState>);
  user = this._store.selectSignal((state: AppState) => state.user.user);
  weather = this._store.selectSignal((state: AppState) => state.shared.weather);

  agoraService = inject(AgoraService);
  _general = inject(GeneralService);

  time = new Date();
  // options: any = {
  //   appId: '111e3a0206cf4a3997b6ba5e393a34a2',
  //   channel: 'samirlousif',
  //   token:
  //     '007eJxTYNBrV+hc6ZsRIdL4PPvo9rDd4ROEj3pUTXhtXJxf5t66gVWBwdDQMNU40cDIwCw5zSTR2NLSPMksKdE01djSONHYJNHohtyP1IZARoYqYUUmRgYIBPGZGBITGRgAoAkcvQ==',
  //   uid: null,
  // };

  localVideoTrack: ICameraVideoTrack | null;
  remoteVideoTracks: any;
  constructor() {
    this.localVideoTrack = this.agoraService.getLocalVideoTrack();
    this.remoteVideoTracks = this.agoraService.getRemoteVideoTracks();
    if (
      this.compareDate(this.weather()?.current?.last_updated) || !this.weather()
    ) {
      this._general.getWeatherToday().subscribe((res) => {
        console.log('weather general', res);
        this._store.dispatch(setWeather({ weather: res }));
        localStorage.setItem(
          'weather',
          JSON.stringify(res)
        );
      });
    }
  }

  compareDate(date: string) {
    const savedDate = new Date(date);
    savedDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate > savedDate;
  }

  async joinCall() {
    // Use AgoraService to join call with provided details
    await this.agoraService.initLocalTracks();
    await this.agoraService.joinChannel(
      'b5d8bba83dba468f80712692493f1180',
      '260309',
      '007eJxTYDgzW9jEwPHD68ztxq9XTztvzTCR/eej1LfW0VGePheydaQUGJJMUyySkhItjFOSEk3MLNIsDMwNjcwsjUwsjdMMDS0MApqZ0hoCGRkWXGtnZmSAQBCfjcHIzMDYwJKBAQBpuR4R'
    );
    this.displayVideo(this.agoraService.getLocalVideoTrack());
    setTimeout(() => {
      // console.log(this.agoraService.remoteUsers);

      this.displayRemoteVideo(this.agoraService.remoteUsers['1524752474']);

      const videoElement1: any = document.getElementById('local');
      const videoElement2: any = document.getElementById('remote');

      // Make sure the canvas and video elements are ready
      setTimeout(() => {
        this.combineStreams(videoElement1, videoElement2);
      }, 2000);
    }, 3000);
  }

  async leaveCall() {
    // Use AgoraService to leave call
    await this.agoraService.leaveChannel();
  }

  //record
  mediaRecorder: any;
  combinedStream: any;
  // recordCall() {
  //   // Get the local track's MediaStreamTrack
  //   const localTrackPromise = this.agoraService
  //     .getLocalVideoTrack()
  //     ?.getMediaStreamTrack();

  //   // Extract all remote tracks from the remoteUsers object and convert them to MediaStreamTrack promises
  //   const remoteTracksPromises = Object.values(
  //     this.agoraService.remoteUsers
  //   ).map((remoteUserTrack) => remoteUserTrack.getMediaStreamTrack());

  //   // Combine all promises and proceed once all tracks are retrieved
  //   Promise.all([...remoteTracksPromises, localTrackPromise])
  //     .then((tracks) => {
  //       // Combine all tracks into a single MediaStream
  //       const combinedStream = new MediaStream(tracks);
  //       this.combinedStream = combinedStream;
  //       console.log('combinedStream', this.combinedStream);

  //       this.combinedStream;
  //       try {
  //         // Set up the MediaRecorder with the combined stream
  //         this.mediaRecorder = new MediaRecorder(combinedStream);

  //         let chunks: any = [];

  //         // Collect chunks of recorded data
  //         this.mediaRecorder.ondataavailable = (event: any) => {
  //           chunks.push(event.data);
  //         };

  //         // Handle the final recording blob
  //         this.mediaRecorder.onstop = () => {
  //           const blob = new Blob(chunks, { type: 'video/webm' });
  //           console.log(blob, 'Blob ready for use');
  //           this.saveBlob(blob, 'recording.webm');
  //           // Here, you can handle the blob (save, upload, etc.)
  //         };

  //         // Start recording
  //         this.mediaRecorder.start();
  //         // Ensure you have a way to stop the recording when needed
  //       } catch (error) {
  //         console.error('Error setting up media recorder:', error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error accessing media stream tracks:', error);
  //     });
  // }

  saveBlob(blob: any, fileName: any) {
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');

    // Set the download attribute of the link to the desired file name
    link.download = fileName;

    // Set the href of the link to the blob URL
    link.href = url;

    // Append the link to the document
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    // Release the blob URL to free up resources
    window.URL.revokeObjectURL(url);
  }

  localsteam: any;
  remotestream: any;

  private downloadVideo(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my_video.webm';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  async getMediaStreamTrack(
    agoraVideoTrack: ICameraVideoTrack
  ): Promise<MediaStreamTrack> {
    return agoraVideoTrack.getMediaStreamTrack();
  }

  async displayVideo(track: any) {
    const mediaStreamTrack = await this.getMediaStreamTrack(track);
    const stream = new MediaStream([mediaStreamTrack]);
    this.localsteam = stream;
    return stream;
  }

  async displayRemoteVideo(track: any) {
    const mediaStreamTrack = await this.getMediaStreamTrack(track);
    const stream = new MediaStream([mediaStreamTrack]);
    this.remotestream = stream;
    return stream;
  }

  recordedChunks: any = [];

  combineStreams(video1: HTMLVideoElement, video2: HTMLVideoElement) {
    // console.log('combineStreams', video1, video2);

    const canvas = this.combinedCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    // Set canvas size to accommodate both videos side by side
    canvas.width = 2048;
    canvas.height = 768;

    // Function to draw the video frames onto the canvas
    const draw = () => {
      if (ctx) {
        ctx.drawImage(video1, 0, 0, 1024, 768);
        ctx.drawImage(video2, 1024, 0, 1024, 768);
      }
      requestAnimationFrame(draw); // Continue drawing frames
    };

    draw(); // Start drawing

    // Optionally, start recording the canvas
    this.startRecording(canvas);
  }

  startRecording(canvas: HTMLCanvasElement) {
    const stream = canvas.captureStream(); // Capture the canvas content as a stream
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event: any) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      this.downloadVideo(blob); // Implement this function to download or handle the recorded video blob
    };

    this.mediaRecorder.start();
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop(); // This triggers the 'onstop' event and the recorded video blob is processed
    }
  }
}
