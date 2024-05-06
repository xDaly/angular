import { createSelector } from '@ngrx/store';
import { sharedReducer } from '../shared/store/shared/shared.reducer';
import { IShared } from '../shared/store/shared/shared.state';
import { IUserState } from '@features/auth/store/auth.state';
import { userReducer } from '@features/auth/store/auth.reducer';
import { StorageEffects } from '@shared/store/storage/storage.effect';
import { storageReducer } from '@shared/store/storage/storage.reducer';
import { IStorage } from '@shared/store/storage/storage.state';
import { IMission } from '@features/mission/store/mission/mission.state';
import { missionReducer } from '@features/mission/store/mission/mission.reducer';
import { assistanceReducer } from '@features/assistance/store/assistance/assistance.reducer';
import { IAssistance } from '@features/assistance/store/assistance/assistance.state';

export interface AppState {
  shared: IShared;
  user: IUserState;
  storage: IStorage;
  mission: IMission;
  assistance: IAssistance;
}

export const drawerFeature = (state: AppState) => state.shared;

export const isOpenedSelector = createSelector(
  drawerFeature,
  (state: IShared) => state.drawerOpened
);

export const REDUCERS = {
  shared: sharedReducer,
  user: userReducer,
  storage: storageReducer,
  mission: missionReducer,
  assistance: assistanceReducer,
};

export const EFFECTS = [StorageEffects];
