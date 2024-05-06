export interface IShared {
  drawerOpened: boolean;
  remoteStream: any;
  weather: any;
  inCall : boolean;
  toastr: {
    toastrType: string;
    toastrMessage: string;
    component?: any;
    name?: string;
    id?: string;
  };
}
