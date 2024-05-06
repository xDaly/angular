import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AssistanceService } from '@features/assistance/services/assistance.service';
import { EventsService } from '@features/assistance/services/events.service';
import {
  isReadyToCall,
  removeCustomer,
  setCall,
  setCallEnded,
  setCustomer,
} from '@features/assistance/store/assistance/assistance.actions';
import { AuthService } from '@features/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { MissingCallToastComponent } from '@shared/components/missing-call-toast/missing-call-toast.component';
import { AgoraService } from '@shared/services/agora.service';
import { SharedService } from '@shared/services/shared.service';
import { SocketService } from '@shared/services/socket.service';
import { openToastr, setinCall } from '@shared/store/shared/shared.actions';
import { AppState } from '@store/store';
import * as feather from 'feather-icons';
import { filter } from 'rxjs';
import { DrawerComponent } from 'src/app/shared/components/drawer/drawer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SearchComponent } from 'src/app/shared/components/header/search/search.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { NavservicesService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    RouterModule,
    DrawerComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  router = inject(Router);
  _agora = inject(AgoraService);
  _shared = inject(SharedService);
  _auth = inject(AuthService);
  _socket = inject(SocketService);
  _store = inject(Store<AppState>);
  _assistance = inject(AssistanceService);
  id = this._store.selectSignal((state: AppState) => state.user.user.id);
  route: string;
  public show: boolean = false;
  public isShow: boolean = false;
  public urrentRoute!: string;
  public urlPath!: string;
  public innerWidth!: number;

  incomingCalls = this._store.select(
    (state: AppState) => state.assistance.customers
  );

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 1200) {
      this.layout.config.settings.sidebar_type =
        'compact-sidebar compact-small material-icon';
    }
  }

  constructor(
    public navService: NavservicesService,
    public layout: LayoutService
  ) {
    this._socket.connect(this.id() as string);
    this.router.events
      .pipe(filter((instance: any) => instance instanceof NavigationEnd))
      .subscribe((val) => {
        this.route = val.urlAfterRedirects;
      });
    this.customer_call_invite();
    this.call_ended();
    this.call_started();
    this.received_call_answered();
    this.received_call_canceled();

    this.incomingCalls.subscribe((data) => {
      if (data.length > 0) {
        this._shared.startPulse();
      } else {
        this._shared.stopPulse();
      }
    });

    this._assistance.getInitializedCalls().subscribe({
      next: ({ data }: any) => {
        data.forEach((call: any) => {
          this._store.dispatch(setCustomer({ customer: call }));
        });
        if (data.length > 0) {
          this._store.dispatch(isReadyToCall({ readyToCall: true }));
        }
      },
      error: (error) => {},
    });
  }

  ngOnInit(): void {
    const url = this.router.url;
    this.innerWidth = window.innerWidth;
  }

  ngAfterViewInit() {
    feather.replace();
  }

  get layoutClass() {
    return (
      this.layout.config.settings.sidebar_type +
      ' ' +
      this.layout.config.settings.layout.replace('layout', 'sidebar')
    );
  }

  customer_call_invite() {
    this._socket.listen('customer_call_invite').subscribe((data: any) => {
      if (this.route != '/assistance') {
        this._store.dispatch(
          openToastr({
            toastrType: 'missedCall',
            toastrMessage: '',
            id: data.customer.registration_number,
            name: data.customer.first_name + ' ' + data.customer.last_name,
            image: data.customer.id,
            component: MissingCallToastComponent,
          })
        );
      }
      this._store.dispatch(isReadyToCall({ readyToCall: true }));
      this._store.dispatch(setCustomer({ customer: data }));
    });
  }

  call_ended() {
    this._socket.listen('received_call_ended').subscribe(async (data: any) => {
      // console.log('Call ended', data);
      this._store.dispatch(removeCustomer({ id: data.customer_id }));
      this._store.dispatch(setCallEnded());
      await this._agora.leaveChannel();
    });
  }

  received_call_answered() {
    this._socket.listen('received_call_answered').subscribe((data: any) => {
      this._store.dispatch(removeCustomer({ id: data.customer_id }));
    });
  }

  call_started() {
    this._socket.listen('received_call_started').subscribe((data: any) => {
      this._store.dispatch(setinCall({inCall: true}));
      let call = {...data}
      call.start_date = new Date().toString();
      this._store.dispatch(setCall({ call: call }));
    });
  }

  received_call_canceled() {
    this._socket.listen('received_call_canceled').subscribe((data: any) => {
      console.log('Call canceled', data, 'from received_call_canceled in dashboard layout ');
      
      this._store.dispatch(removeCustomer({ id: data.customer_id }));
    });
  }
}
