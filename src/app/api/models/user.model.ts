import { Language } from './lang.model';
import { Role } from './role.model';
import { ACCOUNT_STATUS } from './status.model';

export interface IUser {
  id: string;
  registration_number: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  gov_id: string;
  email: string;
  physical_address: string;
  phone_number: string;
  primary_language: string,
  secondary_language: string,
  tertiary_language: string,
  account_status: ACCOUNT_STATUS | null;
  disponibility: string;
  last_connection: string;
  current_role: Role | null;
  createdAt: string;
  updatedAt: string;
  call_center_id: string;
  status: string;
  is_deleted: boolean;
  languages: Language[];
}
