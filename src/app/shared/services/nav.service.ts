import { Injectable, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import { combineLatest, merge } from 'rxjs';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface Menu {
  id?: number;
  headTitle1?: string;
  mainTitle?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  item?: Menu[];
  children?: Menu[];
  disabled?: boolean;
  count?: any;
}

@Injectable({
  providedIn: 'root',
})
export class NavservicesService {
  public language: boolean = false;
  public collapseSidebar: boolean = window.innerWidth < 1200 ? true : false;
  public horizontal: boolean = window.innerWidth < 1200 ? false : true;
  public isDisplay!: boolean;
  public search!: boolean;
  public isShow: boolean = false;

  _store = inject(Store<AppState>);

  remoteStream = this._store.select(
    (state: AppState) => state.shared.remoteStream
  );

  inCall = this._store.selectSignal(
    (state: AppState) => state.shared.inCall
  );


  constructor() {
    effect(() => {
      
      if (this.inCall()) {
        const disabled = this.Nvabarmenu.map((item) => {
          item.disabled = true;
          return item; // Return the modified item
        });
        this.items.next(disabled);
      } else {
        const disabled = this.Nvabarmenu.map((item) => {
          if (
            item.path == 'general' ||
            item.path == 'mission' ||
            item.path == 'assistance'
          ) {
            item.disabled = false;
          }
          return item; // Return the modified item
        });
        this.items.next(disabled);
      }
    });
  }

  Nvabarmenu: Menu[] = [
    {
      id: 1,
      icon: '/assets/sidebar-icons/home.svg',
      mainTitle: 'Accueil',
      path: 'general',
      disabled: false,
      //headTitle1: 'General',
      // item: [
      //   {
      //     title: 'Dashboard',
      //     icon: 'home',
      //     type: 'sub',
      //     active: false,
      //     children: [
      //       { path: '/dashboard/default', title: 'Shopping Place', type: 'link' },
      //       { path: '/dashboard/crm-dashboard', title: 'CRM Dashboard', type: 'link' },
      //     ],
      //   }
      // ]
    },
    {
      id: 2,
      icon: '/assets/sidebar-icons/mission.svg',
      mainTitle: 'Appels émis',
      path: 'mission',
      disabled: false,
    },
    {
      id: 3,
      icon: '/assets/sidebar-icons/assistance.svg',
      mainTitle: 'Appels réçus',
      path: 'assistance',
      disabled: false,
    },
    {
      id: 5,
      icon: '/assets/sidebar-icons/sos.svg',
      mainTitle: 'Appel SOS',
      path: 'sos',
      disabled: true,
    },
    {
      id: 6,
      icon: '/assets/sidebar-icons/history.svg',
      mainTitle: 'Historique des appels',
      path: 'assistance-calls-history',
      disabled: true,
    },
    {
      id: 7,
      icon: '/assets/sidebar-icons/callbacks.svg',
      mainTitle: 'Réclamations',
      path: 'callbacks',
      disabled: true,
    },
    {
      id: 8,
      icon: '/assets/sidebar-icons/tablet.svg',
      mainTitle: 'Liste des Rappels',
      path: 'warning-tablet',
      disabled: true,
    },
    {
      id: 9,
      icon: '/assets/sidebar-icons/warning.svg',
      mainTitle: 'Tablettes',
      path: 'warning-call',
      disabled: true,
    },
    {
      id: 10,
      icon: '/assets/sidebar-icons/clients.svg',
      mainTitle: 'Clients',
      path: 'clients',
      disabled: true,
    },
    {
      id: 11,
      icon: '/assets/sidebar-icons/service_provider.svg',
      mainTitle: 'Prestataires',
      path: 'prestataires',
      disabled: true,
    },
  ];
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);
}
