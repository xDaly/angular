import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ROUTES } from '@api/api.constants';
import { IAUTH } from './interfaces/iauth.interface';
import {
  IAUTHRequest,
  IAUTHResponse,
  IGetWorkerInfoResponse,
} from '@api/dtos/auth/auth.dto';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import { setToken, setUserState } from '../store/auth.actions';
import { getItem } from '@helpers/storage';
import { GLOBAL_VARIABLES } from '@core/variables.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAUTH {
  http = inject(HttpClient);
  _store = inject(Store<AppState>);
  constructor() {
    this._store.dispatch(
      setToken({ token: getItem(GLOBAL_VARIABLES.TOKEN) as string })
    );
   // this.getWorkerProfile();
  }
  getWorkerProfile(): void {
    this.http
      .get<IGetWorkerInfoResponse>(API_ROUTES.AUTH.GET_WORKER_PROFILE)
      .subscribe({
        next: (res: IGetWorkerInfoResponse) => {
          this._store.dispatch(setUserState({ user: res.data }));
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  getWorkerProfileAsync():Observable<IGetWorkerInfoResponse> {
    return this.http.get<IGetWorkerInfoResponse>(
      API_ROUTES.AUTH.GET_WORKER_PROFILE
    );
  }

  signInWorker(data: IAUTHRequest): Observable<IAUTHResponse> {
    return this.http.post<IAUTHResponse>(API_ROUTES.AUTH.SIGNIN, data);
  }
  signOutWorker(): Observable<IAUTHResponse> {
    return this.http.post<IAUTHResponse>(API_ROUTES.AUTH.SIGNOUT, {});
  }
}
