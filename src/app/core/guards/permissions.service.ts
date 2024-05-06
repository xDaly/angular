import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { APP_ROUTES } from '@core/routes.constants';
import { GLOBAL_VARIABLES } from '@core/variables.constants';
import { AuthService } from '@features/auth/services/auth.service';
import {
  clearUserState,
  setUserState,
} from '@features/auth/store/auth.actions';
import { getItem } from '@helpers/storage';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  _auth = inject(AuthService);

  constructor() {}

  getTokenFromLocalstorage() {
    return !!getItem(GLOBAL_VARIABLES.TOKEN);
  }
  checkToken() {
    return true;
  }
}

export const authGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  const token = store.selectSignal((state: AppState) => state.user.token);
  try {
    if (!token()) {
      router.navigate([APP_ROUTES['AUTHENTIFICATION'].routeSlash]);
      return false;
    }
    const profile = await lastValueFrom(
      inject(AuthService).getWorkerProfileAsync()
    );

    store.dispatch(setUserState({ user: profile.data }));
    if (state.url === APP_ROUTES['AUTHENTIFICATION'].routeSlash) {
      if (token()) {
        router.navigate([APP_ROUTES['DASHBOARD'].routeSlash]);
        return false;
      }
    }
    if (
      Object.values(APP_ROUTES)
        .filter((x) => x.public)
        .find((r) => r.route == state.url.split('/')[1])
    ) {
      if (!token()) {
        router.navigate([APP_ROUTES['AUTHENTIFICATION'].routeSlash]);
        return false;
      }
    }
    return true;
  } catch (error) {
    localStorage.clear();
    store.dispatch(clearUserState());
    router.navigate([APP_ROUTES['AUTHENTIFICATION'].routeSlash]);
    return false;
  }
};

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const token = getItem(GLOBAL_VARIABLES.TOKEN);
  const user = inject(Store<AppState>).selectSignal(
    (state: AppState) => state.user.user
  );

  if (
    !Object.values(APP_ROUTES)
      .filter((x) => x.roleBased)
      .find((r) => r.route == state.url.split('/')[1])
      ?.roles.includes(user().current_role as any)
  ) {
    inject(Router).navigate([APP_ROUTES['UNAUTHORIZED'].routeSlash]);
    return false;
  }
  return true;
};
