import { IUser } from '@api/models/user.model';
import { createAction, props } from '@ngrx/store';

export const setUserState = createAction(
  '[USER] Set User State',
  props<{ user: IUser }>()
);

export const setToken = createAction(
  '[USER] Set Token ',
  props<{ token: string }>()
);
export const clearUserState = createAction('[USER] Clear User State');