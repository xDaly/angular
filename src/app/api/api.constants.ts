import { environment } from 'src/environments/environment.main';

export const BASE_URL = environment.BASE_URL;
export const SOCKET_URL = environment.SOCKET_URL;
export const CDN_URL = environment.CDN_URL;

export const API_ROUTES = {
  AUTH: {
    SIGNIN: `${BASE_URL}/auth/sign-in-staff`,
    SIGNOUT: `${BASE_URL}/auth/sign-out-staff`,
    GET_WORKER_PROFILE: `${BASE_URL}/auth/get-staff-information`,
  },
  MISSION: {
    GET_SCHEDULE_BY_SHIFT: `${BASE_URL}/schedule/daily-schedule`,
    GET_SHIFTS: `${BASE_URL}/shift/get-shift-all`,
    RESET_SHIFT: `${BASE_URL}/schedule/reschedule`,
  },
  ASSISTANCE: {
    GET_MISSED_CALLS: `${BASE_URL}/call/get-staff-missed-calls`,
    GET_INITIALIZED_CALLS: `${BASE_URL}/call/get-initialized-calls`,
  },
};
