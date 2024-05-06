import { createAction, props } from '@ngrx/store';
import { Call, Customer, Shift } from './mission.state';

export const setLocalStream = createAction('[MISSION] Set Local Stream',props<{ localStream: any }>());
export const setRemoteStream = createAction('[MISSION] Set Remote Stream',props<{ remoteStream: any }>());
export const stopLocalStream = createAction('[MISSION] Stop Local Stream');
export const stopRemoteStream = createAction('[MISSION] Stop Remote Stream');
export const setShifts = createAction('[MISSION] Set Shifts',props<{ shifts: Shift[] }>());
export const setCurrentShift = createAction('[MISSION] Set Current Shift',props<{ shift: string }>());
export const setShiftData = createAction('[MISSION] Set Shift Data', props<{shift: string;customers: Customer[];}>());
export const setError = createAction('[MISSION] Set Error', props<{error: string}>());
export const removeElementFromCustomers = createAction('[MISSION] Remove Element From Customers', props<{id: string}>());
export const setInitializedCall = createAction('[MISSION] Set Initialized Call', props<{call: Call |null}>());
export const setCallStarted = createAction('[MISSION] Set Call Started');
export const setCallEnded = createAction('[MISSION] Set Call Ended');
export const isReadyToCall = createAction('[MISSION] Is Ready To Call', props<{readyToCall : boolean}>());
export const incrementTime = createAction('[MISSION] Increment Time');



