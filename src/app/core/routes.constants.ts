import { ROLES } from './variables.constants';

export const APP_ROUTES: {
  [key: string]: {
    route: string;
    public: boolean;
    routeSlash: string;
    data: any;
    roleBased: boolean;
    roles: string[];
  };
} = {
  DASHBOARD: {
    route: '',
    public: false,
    routeSlash: '/',
    data: {},
    roleBased: true,
    roles: [ROLES.ADMIN, ROLES.ASSISTANT],
  },
  GENERAL: {
    route: 'general',
    public: false,
    routeSlash: '/general',
    data: {},
    roleBased: true,
    roles: [ROLES.ADMIN, ROLES.ASSISTANT],
  },
  ASSISTANCE: {
    route: 'assistance',
    public: false,
    routeSlash: '/assistance',
    data: {},
    roleBased: true,
    roles: [ROLES.ADMIN , ROLES.ASSISTANT],
  },
  MISSION: {
    route: 'mission',
    public: false,
    routeSlash: '/mission',
    data: {},
    roleBased: true,
    roles: [ROLES.ADMIN, ROLES.ASSISTANT],
  },
  AUTHENTIFICATION: {
    route: 'authentification',
    public: true,
    routeSlash: '/authentification',
    data: {},
    roleBased: false,
    roles: [],
  },
  RESET_PASSWORD: {
    route: 'reset-password',
    public: true,
    routeSlash: '/reset-password',
    data: {},
    roleBased: false,
    roles: [],
  },
  UNAUTHORIZED: {
    route: 'unauthorized',
    public: true,
    routeSlash: '/unauthorized',
    data: {},
    roleBased: false,
    roles: [],
  },
  PAGE_NOT_FOUND: {
    route: '**',
    public: true,
    routeSlash: '/page-not-found',
    data: {},
    roleBased: false,
    roles: [],
  },
};
