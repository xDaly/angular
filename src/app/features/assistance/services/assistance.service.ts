import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ROUTES } from '@api/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
http = inject(HttpClient);
  constructor() { }

  getMissedCalls() {
    return this.http.get(API_ROUTES.ASSISTANCE.GET_MISSED_CALLS);
  }
  getInitializedCalls() {
    return this.http.get(API_ROUTES.ASSISTANCE.GET_INITIALIZED_CALLS);
  }
}
