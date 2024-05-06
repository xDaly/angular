import { createAction, props } from '@ngrx/store';



export const setName = createAction(
  '[STORAGE] Set Name',
  props<{
    name: string;
  }>()
);
export const setNameStorage = createAction(
  '[STORAGE] Set Name Storage',
  props<{
    name: string;
  }>()
);
