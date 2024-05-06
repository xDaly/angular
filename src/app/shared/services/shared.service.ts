import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CDN_URL } from '@api/api.constants';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  Observer,
  filter,
  fromEvent,
  lastValueFrom,
  map,
  merge,
  switchMap,
} from 'rxjs';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  _store = inject(Store<AppState>);
  _toastr = inject(ToastrService);
  _title = inject(Title);
  _translate = inject(TranslateService);
  http = inject(HttpClient);

  private audio: HTMLAudioElement;
  pulseInterval: any;

  constructor() {
    this.audio = new Audio('/assets/audio/ring.wav');
    this.audio.loop = true;

    this.subscribeToToastr();
    this.createOnline$().subscribe((isOnline) => {
      if (isOnline) {
        this._toastr.success('En ligne', '', {
          messageClass: 'text-light',
          positionClass: 'toast-top-center',
          timeOut: 1000,
        });
      } else {
        this._toastr.error('Hors ligne');
      }
    });
  }

  subscribeToToastr() {
    this._store
      .select((state) => state.shared.toastr)
      .pipe(
        filter((toastr) => !!toastr.toastrType),
        switchMap((toastr: any) =>
          this._translate.get(toastr.toastrMessage).pipe(
            map((translatedMessage) => ({
              ...toastr,
              toastrMessage: translatedMessage,
            }))
          )
        )
      )
      .subscribe(async (toastr: any) => {
        switch (toastr.toastrType) {
          case 'missedCall':
            const { toastRef } = this._toastr.show('', '', {
              toastComponent: toastr.component,
              closeButton: true,
            });

            toastRef.componentInstance.data = {
              name: toastr.name,
              id: toastr.id,
              image: `${CDN_URL}/uploads/customer/${toastr.image}.webp`,
              action: toastRef,
              timeout: 10000,
            };

            break;
          case 'success':
            this._toastr.success(toastr.toastrMessage, '', {
              messageClass: 'text-light',
              titleClass: 'text-light',
            });
            break;
          case 'error':
            this._toastr.error(toastr.toastrMessage, '', {
              messageClass: 'text-light',
              titleClass: 'text-light',
            });
            break;
          case 'warning':
            this._toastr.warning(toastr.toastrMessage, '', {
              messageClass: 'text-light',
              titleClass: 'text-light',
            });
            break;
          case 'info':
            this._toastr.info(toastr.toastrMessage, '', {
              messageClass: 'text-light',
              titleClass: 'text-light',
            });
            break;
          default:
            break;
        }
      });
  }

  generateRandomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getDifferenceInSeconds(date1: string, date2: string) {
    const formattedDate1 = new Date(date1);
    const formattedDate2 = new Date(date2);
    const differenceInMilliseconds =
      formattedDate2.getTime() - formattedDate1.getTime();
    return differenceInMilliseconds / 1000; //
  }

  createOnline$() {
    return merge<any>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }

  play() {
    console.log('play', this.audio);

    this.audio.play().catch((error) => {
      // Autoplay failed, handle error
      console.error('Autoplay failed:', error);
    });
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  startPulse(): void {
    if (!this.pulseInterval) {
      let showDot = false;
      this.pulseInterval = setInterval(() => {
        this._title.setTitle(showDot ? 'Appel reçu 🔴' : 'Appel reçu');
        showDot = !showDot;
      }, 100);
    }
  }

  stopPulse(): void {
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
      this.pulseInterval = null;
      this._title.setTitle('LILIBOX'); // Reset to original title
    }
  }
}
