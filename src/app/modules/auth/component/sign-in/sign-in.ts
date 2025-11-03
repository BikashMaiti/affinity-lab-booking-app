import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared-module';
import { ThemeService } from '../../../../core/services/theme-service';

@Component({
  selector: 'app-sign-in',
  imports: [SharedModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
theme=inject(ThemeService)
darkMode = ()=>{
  this.theme.toggleTheme();
}
}
