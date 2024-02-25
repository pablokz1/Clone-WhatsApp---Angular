import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './users/user.service';

const appInitializerProvider = (userService: UserService) => {
  return () => {
    userService.trySyncLocalStorage();
  } 
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerProvider,
      deps: [ UserService ],
      multi: true
    }
  ]
};
