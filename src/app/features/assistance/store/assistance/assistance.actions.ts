import { createAction, props } from '@ngrx/store';

export const setLocalStream = createAction('[ASSISTANCE] Set Local Stream',props<{ localStream: any }>());
export const setRemoteStream = createAction('[ASSISTANCE] Set Remote Stream',props<{ remoteStream: any }>());
export const setCustomer = createAction('[ASSISTANCE] Set Customer', props<{customer: any}>());
export const removeCustomer = createAction('[ASSISTANCE] Remove Customer', props<{id: any}>());
export const setCall = createAction('[ASSISTANCE] Set Call', props<{call: any}>());






export const setError = createAction('[ASSISTANCE] Set Error', props<{error: string}>());
export const setCallStarted = createAction('[ASSISTANCE] Set Call Started');
export const setCallEnded = createAction('[ASSISTANCE] Set Call Ended');
export const isReadyToCall = createAction('[ASSISTANCE] Is Ready To Call', props<{readyToCall : boolean}>());
export const incrementTime = createAction('[ASSISTANCE] Increment Time');

