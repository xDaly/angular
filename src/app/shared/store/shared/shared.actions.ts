import { createAction, props } from '@ngrx/store';

export const openDrawer = createAction('[Open Drawer] Open');
export const closeDrawer = createAction('[Close Drawer] Close');
export const setRemoteStream = createAction(
  '[SHARED] Set Remote Stream',
  props<{ remoteStream: any }>()
);

export const openToastr = createAction(
  '[Open Toastr] Open',
  props<{
    toastrType: string;
    toastrMessage: string;
    component?: any;
    name?: string;
    id?: string;
    image?: string;
  }>()
);

export const setWeather = createAction(
  '[Set Weather] Set',
  props<{ weather: any }>()
);
export const setinCall = createAction('[Shared] Set inCall', props<{inCall: boolean}>());
