import { APP_INITIALIZER, ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ThemeService } from './core/services/theme-service';
import AuraPreset from './shared/theme/auraTheme';
export const initTheme = ()=>{
return ()=>{
  const themeService = inject(ThemeService);
  themeService.init();
}
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration:'enabled',
        anchorScrolling:'enabled'
      })
    ),
    provideAnimationsAsync('animations'),
    providePrimeNG({
      theme:{
        preset:AuraPreset,
        options:{
          darkModeSelector:'.app-dark-mode'
        }
      }
    }),
    {
      provide:APP_INITIALIZER,
      useFactory:initTheme,
      multi:true
    }
  ]
};
