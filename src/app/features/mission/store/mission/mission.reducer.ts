import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Call, IMission } from './mission.state';
import * as MissionActions from './mission.actions';
import { AppState } from '@store/store';

export const initialState: IMission = {
  readyToCall: true,
  localStream: null,
  remoteStream: null,
  isCallStarted: false,
  isCallEnded: false,
  currentShift: '',
  shifts: [],
  customers: [],
  isLoading: false,
  isLoaded: false,
  error: null,
  call: null,
};

export const missionReducer = createReducer(
  initialState,
  on(MissionActions.setShiftData, (state, { customers, shift }) => {
    return { ...state, customers: customers, shift: shift };
  }),
  on(MissionActions.setCurrentShift, (state, { shift }) => {
    return { ...state, currentShift: shift };
  }),
  on(MissionActions.setShifts, (state, { shifts }) => {
    return { ...state, shifts: shifts };
  }),
  on(MissionActions.removeElementFromCustomers, (state, { id }) => {
    const oldCustomers = state.customers;
    const filtered = oldCustomers.filter((customer) => customer.id != id);

    return {
      ...state,
      customers: filtered,
    };
  }),
  on(MissionActions.setLocalStream, (state, { localStream }) => {
    return { ...state, localStream: localStream };
  }),
  on(MissionActions.setRemoteStream, (state, { remoteStream }) => {
    return { ...state, remoteStream: remoteStream };
  }),
  on(MissionActions.setInitializedCall, (state, { call }) => {
    return { ...state, call: call, readyToCall: false };
  }),
  on(MissionActions.setCallStarted, (state) => {
    return {
      ...state,
      isCallEnded: false,
      call: { ...state.call, start_date: new Date() as any } as Call,
      isCallStarted: true,
    };
  }),
  on(MissionActions.setCallEnded, (state) => {
    return {
      ...state,
      isCallStarted: false,
      isCallEnded: true,
      readyToCall: true,
    };
  }),
  on(MissionActions.isReadyToCall, (state, { readyToCall }) => {
    return { ...state, readyToCall: readyToCall };
  }),
  on(MissionActions.incrementTime, (state) => ({
    ...state,
    call: {
      ...state.call,
      duration: (state?.call?.duration ?? 0) + 1,
    } as Call,
  }))
);

export const selectMission = (state: AppState) => state.mission;

export const selectCustomerById = (id: string) =>
  createSelector(selectMission, (state: IMission) =>
    state.customers.find((item) => item.id === id)
  );
