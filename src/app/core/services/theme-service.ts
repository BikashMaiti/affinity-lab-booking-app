import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";
import * as PrimeUI from '@primeuix/themes';
export const AmberPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          color: '#F00DB7FF',
          contrastColor: '#232594FF',
          hoverColor:'#2CBE2CFF',
          activeColor:'#642677FF',
          background: '#DADAE6FF'
        },
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
      }
      },
      dark: {
        primary: {
          color: '#232594FF',
          contrastColor: '#FFFFFFFF',
          background: '#383232FF'
        }
      }
    }
  }
});
@Injectable({ providedIn: 'root' })
export class ThemeService {

  private platformId = inject(PLATFORM_ID);

  currentTheme = signal<'light' | 'dark'>('light');

  constructor() {
    this.loadStoredTheme();
  }
  init() {
    this.loadStoredTheme();   // ✅ runs BEFORE app loads
  }
  toggleTheme() {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.currentTheme.set(newTheme);
    this.applyTheme(newTheme);

    // Store only in browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', newTheme);
    }
  }

  private loadStoredTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const themeToApply = saved ?? 'light';

      this.currentTheme.set(themeToApply);
      this.applyTheme(themeToApply);
    } else {
      // SSR fallback (avoid DOM access)
      this.currentTheme.set('light');
    }
  }

  private applyTheme(theme: 'light' | 'dark') {
    if (!isPlatformBrowser(this.platformId)) return; // ✅ avoid SSR crash

    const html = document.documentElement;

    if (theme === 'dark') {
      html.classList.add('app-dark-mode');
    } else {
      html.classList.remove('app-dark-mode');
    }
  }
  applyAmberTheme() {
    PrimeUI.usePreset(AmberPreset);
  }
}
