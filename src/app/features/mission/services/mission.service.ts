import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ROUTES } from '@api/api.constants';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import { Observable } from 'rxjs';
import {
  setCurrentShift,
  setError,
  setShiftData,
  setShifts,
} from '../store/mission/mission.actions';
import { Shift } from '../store/mission/mission.state';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  _http = inject(HttpClient);
  _store = inject(Store<AppState>);

  constructor() {}

  getScheduleByShift(shift: string) {
    this._http
      .post<{ customers: any[]; shift: string }>(
        API_ROUTES.MISSION.GET_SCHEDULE_BY_SHIFT,
        {
          shift: shift,
        }
      )
      .subscribe({
        next: ({ data }: any) => {
          this._store.dispatch(
            setShiftData({
              customers: data.customers,
              shift: data.shift,
            })
          );
        },
        error: (error) => {
          this._store.dispatch(setError({ error: 'error' }));
        },
      });
  }
  getShifts() {
    this._http.get(API_ROUTES.MISSION.GET_SHIFTS).subscribe({
      next: (res: any) => {
        const currentShift = this.setCurrentShift(res.data);
        this._store.dispatch(setCurrentShift({ shift: currentShift }));
        this._store.dispatch(setShifts({ shifts: res.data }));
      },
      error: (error) => {
        this._store.dispatch(setError({ error: 'error' }));
      },
    });
  }

  setCurrentShift(shifts: Shift[]): string {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    const currentShift = shifts.find((shift) => {
      return currentHour >= shift.start_time && currentHour < shift.end_time;
    });

    return currentShift ? currentShift.name : 'No shift currently';
  }
}
