import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const token = inject(Store<AppState>).selectSignal(
    (state: AppState) => state.user.token
  );
  const modifiedReq = req.clone({
    headers: req.headers
      .set('Authorization', `${token()}`)
      .set('ngrok-skip-browser-warning', '69420'),
  });

  return next(modifiedReq);
};
