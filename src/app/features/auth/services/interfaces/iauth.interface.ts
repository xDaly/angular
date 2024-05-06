import {
  IAUTHRequest,
  IAUTHResponse,
  IGetWorkerInfoResponse,
} from '@api/dtos/auth/auth.dto';
import { Observable } from 'rxjs';

export interface IAUTH {
  signInWorker(data: IAUTHRequest): Observable<IAUTHResponse>;
  getWorkerProfile(): void;
}
