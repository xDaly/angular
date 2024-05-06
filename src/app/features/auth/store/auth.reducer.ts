import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IUserState } from './auth.state';

export const initialState: IUserState = {
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
  token: '',
};

export const userReducer = createReducer(
  initialState,
  on(AuthActions.setUserState, (state, { user }) => ({ ...state, user })),
  on(AuthActions.setToken, (state, { token }) => ({ ...state, token })),
  on(AuthActions.clearUserState, (state) => ({
    ...state,
    user: {} as any,
    token: '',
  }))
);
