
export interface IAssistance {
  readyToCall: boolean;
  call: any;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isCallStarted: boolean;
  isCallEnded: boolean;
  customers: any[];
}
