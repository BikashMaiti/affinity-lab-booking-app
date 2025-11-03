import { HttpClient } from '@angular/common/http';
import { Component, inject, makeStateKey, OnInit, TransferState } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../modules/shared-module';

const DASHBOARD_DATA = makeStateKey<any>('dashboard-data');
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './root-dashboard.html',
  styleUrl: './root-dashboard.css'
})
export class RootDashboard implements OnInit {
 ngOnInit(): void {
     
 }
}
