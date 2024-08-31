import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch()),
    provideAuth0({
      domain: 'dev-lqqe00nf3isvk1mr.us.auth0.com',
      clientId: 'GsaybHHDMgLs2pSwwsxQaNwtp9ivpcfv',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
};
