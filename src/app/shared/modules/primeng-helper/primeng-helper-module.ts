import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [],
  imports: [
    ButtonModule,InputTextModule,InputNumberModule,CardModule,DatePickerModule,
    FormsModule,AutoCompleteModule,CascadeSelectModule,CheckboxModule,DialogModule,PasswordModule
  ],
  exports:[
    ButtonModule,InputTextModule,InputNumberModule,CardModule,DatePickerModule,
    FormsModule,AutoCompleteModule,CascadeSelectModule,CheckboxModule,DialogModule,PasswordModule
  ]
})
export class PrimengHelperModule { }
