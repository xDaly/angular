import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'prefix',
  },
  {
    path: 'general',
    loadComponent: () =>
      import('@features/general/general.component').then(
        (c) => c.GeneralComponent
      ),
  },
  {
    path: 'mission',
    loadComponent: () =>
      import('@features/mission/mission.component').then(
        (c) => c.MissionComponent
      ),
  },
  {
    path: 'assistance',
    loadComponent: () =>
      import('@features/assistance/assistance.component').then(
        (c) => c.AssistanceComponent
      ),
  },
  {
    path: 'missed-calls',
    loadComponent: () =>
      import(
        '@features/dashboard/pages/missed-calls/missed-calls.component'
      ).then((c) => c.MissedCallsComponent),
  },
  {
    path: 'assistance-calls-history',
    loadComponent: () =>
      import(
        '@features/dashboard/pages/assistance-calls-history/assistance-calls-history.component'
      ).then((c) => c.AssistanceCallsHistoryComponent),
  },
  {
    path: 'callbacks',
    loadComponent: () =>
      import('@features/dashboard/pages/callbacks/callbacks.component').then(
        (c) => c.CallbacksComponent
      ),
  },
  {
    path: 'warning-tablet',
    loadComponent: () =>
      import(
        '@features/dashboard/pages/warning-tablet/warning-tablet.component'
      ).then((c) => c.WarningTabletComponent),
  },
  {
    path: 'warning-call',
    loadComponent: () =>
      import(
        '@features/dashboard/pages/warning-call/warning-call.component'
      ).then((c) => c.WarningCallComponent),
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('@features/dashboard/pages/clients/clients.component').then(
        (c) => c.ClientsComponent
      ),
  },
  {
    path: 'prestataires',
    loadComponent: () =>
      import(
        '@features/dashboard/pages/prestataires/prestataires.component'
      ).then((c) => c.PrestatairesComponent),
  },
];
