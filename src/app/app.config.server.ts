import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LOCAL_STORAGE } from './components/shared/tokens/token';
import { LoginService } from './components/pages/login-page/services/login.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: LOCAL_STORAGE,
      useFactory: () => ({
        getItem: () => { },
        setItem: () => { },
        removeItem: () => { },
      }),
    },
    LoginService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
