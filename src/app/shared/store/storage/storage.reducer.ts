import { Action, createReducer, on } from '@ngrx/store';
import * as StorageActions from './storage.actions';
import { IStorage } from './storage.state';

export const initialState: IStorage = {
  name: '',
};

export const storageReducer = createReducer(
  initialState,
  on(StorageActions.setName, (state, { name }) => {
    return {
      ...state,
      name: name,
    };
  }),
  on(StorageActions.setNameStorage, (state, { name }) => {
    localStorage.setItem('name', name);
    return {
      ...state
    };
  })
);
