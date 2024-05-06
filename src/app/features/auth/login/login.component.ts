import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FeathericonComponent } from '../../../shared/components/feathericon/feathericon.component';
import { IAUTH } from '../services/interfaces/iauth.interface';
import { IAUTHRequest, IAUTHResponse } from '@api/dtos/auth/auth.dto';
import { AuthService } from '../services/auth.service';
import { AppState } from '@store/store';
import { Store } from '@ngrx/store';
import { openToastr } from '@shared/store/shared/shared.actions';
import { APP_ROUTES } from '@core/routes.constants';
import { setToken, setUserState } from '../store/auth.actions';
import { setItem } from '@helpers/storage';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    SvgIconComponent,
    ReactiveFormsModule,
    FeathericonComponent,
    LottieComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  _auth = inject(AuthService);
  _store = inject(Store<AppState>);
  isLoading: boolean = false;
  public show: boolean = false;
  public loginForm: FormGroup;
  options: AnimationOptions = {
    path: '/assets/lotties/loading.json',
  };
  loginError: string = '';

  constructor(private fb: FormBuilder, public router: Router) {
    this.loginForm = this.fb.group({
      registration_number: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate([APP_ROUTES['DASHBOARD'].routeSlash]);
    }
  }

  showPassword() {
    this.show = !this.show;
  }

  login() {
    this.loginError = '';
    if (!this.loginForm.valid) {
      this._store.dispatch(
        openToastr({
          toastrType: 'error',
          toastrMessage: 'information rerquired',
        })
      );
    }
    this.isLoading = true;
    this._auth.signInWorker(this.loginForm.value).subscribe({
      next: (res: IAUTHResponse) => {
        this._store.dispatch(
          openToastr({ toastrType: 'success', toastrMessage: res.message })
        );
        const { token, ...userData } = res.data;
        this._store.dispatch(setToken({ token }));
        this._store.dispatch(setUserState({ user: userData }));
        setItem('token', res.data.token);
        this.router.navigate([APP_ROUTES['DASHBOARD'].routeSlash]);

        // window.location.reload();
      },
      error: (err) => {
        this.loginError = err.error.message || err.message;
        this._store.dispatch(
          openToastr({
            toastrType: 'error',
            toastrMessage: err.error.message || err.message,
          })
        );
        this.isLoading = false;
      },
    });
  }

  openNewWindow() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/page-not-found'])
    );

    window.open(window.location.origin + url, '_popup', 'width=600,height=600');
  }
}
