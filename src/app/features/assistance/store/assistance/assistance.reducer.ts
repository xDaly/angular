import { Action, createReducer, on } from '@ngrx/store';
import { IAssistance } from './assistance.state';
import * as AssistanceActions from './assistance.actions';
import { inject } from '@angular/core';

export const initialState: IAssistance = {
  readyToCall: false,
  call: undefined,
  localStream: null,
  remoteStream: null,
  isCallStarted: false,
  isCallEnded: false,
  customers: [],
};

export const assistanceReducer = createReducer(
  initialState,
  on(AssistanceActions.setCustomer, (state, { customer }) => {
    const oldCustomers = state.customers;
    const filtered = oldCustomers.filter((e) => e.id != customer.id);

    return { ...state, customers: [customer, ...oldCustomers] };
  }),
  on(AssistanceActions.removeCustomer, (state, { id }) => {
     const customers = state.customers
     const filtered = customers.filter((e) => e.customer.id != id);

    return {
      ...state,
      customers: filtered,
    };
  }),
  on(AssistanceActions.setCall, (state, { call }) => {
    return { ...state, call: call };
  }),
  on(AssistanceActions.setCallEnded, (state) => {
    return { ...state, isCallEnded: true, call: null };
  }),
  on(AssistanceActions.isReadyToCall, (state, { readyToCall }) => {
    return { ...state, readyToCall: readyToCall };
  })
);
