import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { PermissionsService } from '@core/guards/permissions.service';
import { SharedService } from '@shared/services/shared.service';
import { MissingCallToastComponent } from '@shared/components/missing-call-toast/missing-call-toast.component';
import { toastAnimations } from '@core/animations';
import { environment } from 'src/environments/environment.main';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import { setWeather } from '@shared/store/shared/shared.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoaderComponent,
    MissingCallToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [toastAnimations.slideInRight, toastAnimations.slideOutRight],
})
export class AppComponent {
  mode = environment.mode || 'production';
  title = 'lilibox-admin';
  _permissions = inject(PermissionsService);
  _shared = inject(SharedService);
  _store = inject(Store<AppState>);
  constructor() {
    this._store.dispatch(setWeather({ weather : JSON.parse(localStorage.getItem('weather') as string)}));
  }
}
