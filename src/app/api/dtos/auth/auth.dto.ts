import { Role } from '@api/models/role.model';
import { ACCOUNT_STATUS } from '@api/models/status.model';
import { IUser } from '@api/models/user.model';

export interface IAUTHRequest {
  registration_number: string;
  password: string;
}

export interface IAUTHResponse {
  status: number;
  message: string;
  success: boolean;
  data: IUser & { token: string };
}

export interface IGetWorkerInfoResponse {
  status: number;
  message: string;
  success: boolean;
  data: IUser;
}
