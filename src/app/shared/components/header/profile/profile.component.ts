import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FeathericonComponent } from '../../feathericon/feathericon.component';
import { APP_ROUTES } from '@core/routes.constants';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import { SharedService } from '@shared/services/shared.service';
import { CDN_URL } from '@api/api.constants';
import { FallbackSvgDirective } from '@shared/pipes/fallbackimage.pipe';
import { SkeletonLoaderDirective } from '@shared/pipes/sekeletonLoader.pipe';
import { TranslateDirective, TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@features/auth/services/auth.service';
import { setToken, setUserState } from '@features/auth/store/auth.actions';
import { SocketService } from '@shared/services/socket.service';
import { openToastr } from '@shared/store/shared/shared.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterModule,
    FeathericonComponent,
    FallbackSvgDirective,
    SkeletonLoaderDirective,
    TranslateModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  CDN_URL = CDN_URL;
  _auth = inject(AuthService);
  _socket = inject(SocketService);
  _store = inject(Store<AppState>); 
  router = inject(Router);
  store = inject(Store<AppState>);
  user = this.store.selectSignal((state: AppState) => state.user.user);
  image: any;
  constructor() {}
  ngOnInit() {}

  logOut() {
    this._auth.signOutWorker().subscribe({
      next: (res) => {
        this.store.dispatch(setToken({ token: '' }));
        this.store.dispatch(
          setUserState({
            user: {
              id: '',
              registration_number: '',
              first_name: '',
              last_name: '',
              birth_date: '',
              gender: '',
              gov_id: '',
              email: '',
              physical_address: '',
              phone_number: '',
              account_status: null,
              disponibility: '',
              last_connection: '',
              current_role: null,
              createdAt: '',
              updatedAt: '',
              call_center_id: '',
              status: '',
              languages: [],
              primary_language: '',
              secondary_language: '',
              tertiary_language: '',
              is_deleted: false,
            },
          })
        );
        this._socket.disconnect();
        localStorage.clear();
        this.router.navigate([APP_ROUTES['AUTHENTIFICATION'].routeSlash]);
        this._store.dispatch(
          openToastr({ toastrType: 'success', toastrMessage: 'Vous êtes déconnecté' })
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
