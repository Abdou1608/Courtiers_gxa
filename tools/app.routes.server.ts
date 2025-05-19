import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server, // ✅ ou .
  },
  {
    path: 'login',
    renderMode: RenderMode.Server,
  },
  {
    path: 'courtiers',
    renderMode: RenderMode.Server,
  }
];
