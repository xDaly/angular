import { Action, createReducer, on } from '@ngrx/store';
import { IShared } from './shared.state';
import * as SharedActions from './shared.actions';

export const initialState: IShared = {
  drawerOpened: false,
  remoteStream: null,
  weather: {},
  inCall: false,
  toastr: {
    toastrType: '',
    toastrMessage: '',
    component: null,
    id: '',
    name: '',
  },
};

export const sharedReducer = createReducer(
  initialState,
  on(SharedActions.openDrawer, (state) => ({ ...state, drawerOpened: true })),
  on(SharedActions.closeDrawer, (state) => ({ ...state, drawerOpened: false })),
  on(
    SharedActions.openToastr,
    (state, { toastrType, toastrMessage, component, id, name, image }) => ({
      ...state,
      toastr: { toastrType, toastrMessage, component, id, name, image },
    })
  ),
  on(SharedActions.setRemoteStream, (state, { remoteStream }) => ({
    ...state,
    remoteStream,
  })),
  on(SharedActions.setWeather, (state, { weather }) => ({
    ...state,
    weather,
  })),
  on(SharedActions.setinCall, (state, { inCall }) => ({
    ...state,
    inCall,
  }))
);
