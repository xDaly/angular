import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateDirective, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { EFFECTS, REDUCERS } from '@store/store';
import { provideToastr } from 'ngx-toastr';
import {  tokenInterceptor } from '@core/token.interceptor';
import { getItem } from '@helpers/storage';
import { GLOBAL_VARIABLES } from '@core/variables.constants';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    importProvidersFrom(RouterModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: GLOBAL_VARIABLES.FR as any || getItem(GLOBAL_VARIABLES.LANG),
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideStore(REDUCERS),
    provideEffects(EFFECTS),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(), // required animations providers
    provideToastr({
      countDuplicates: true,
      preventDuplicates: true,
    }), // Toastr providers
  ],
};
