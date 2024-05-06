export interface IMission {
  readyToCall: boolean;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isCallStarted: boolean;
  isCallEnded: boolean;
  currentShift: string;
  shifts: Shift[];
  customers: Customer[];
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  call: Call | null;
}

export interface Customer {
  id: string;
  registration_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  status: string;
  address: string;
  birth_date: string;
}

export interface Shift {
  id: string;
  name: string;
  start_time: number;
  end_time: number;
}

export interface Call {
  agora_data: {
    app_id: string;
    channel_name: string;
    token: string;
  };
  call_id: string;
  caller_id: string;
  participants: string[];
  shift: string;
  start_date: string;
  duration: number;
}
