import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, defer, fromEvent, of } from 'rxjs';
import { map, exhaustMap, catchError, tap, filter } from 'rxjs/operators';
import { setName, setNameStorage } from './storage.actions';

@Injectable()
export class StorageEffects {
  storeActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setNameStorage),
        map((action) => {          
          return setName({ name: action.name });
        })
        // tap((action) => {
        //   const storedActions = window.localStorage.getItem('__bus');
        //   const actions = storedActions ? JSON.parse(storedActions) : [];
        //   const newActions = [action, ...actions];
        //   window.localStorage.setItem('__bus', JSON.stringify(newActions));
        // })
      )
  );

  onChange$ = createEffect(() =>
    fromEvent<StorageEvent>(window, 'storage').pipe(
      map((evt) => {
        return setName({ name: evt.newValue as string });
      })
    )
  );

  initializeState$ = createEffect(() =>
    defer(() => {
      const storedName = window.localStorage.getItem('name');
      if (storedName) {
        return of(setName({ name: storedName }));
      } else {
        return EMPTY;
      }
    })
  );

  constructor(private actions$: Actions) {}
}
