import { IUser } from '@api/models/user.model';

export interface IUserState {
  user: IUser;
  token?: string;
}
