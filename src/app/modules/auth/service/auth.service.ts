import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { ApiManagerService } from '../../../core/services/api-manager-service';
import { StorageService } from '../../../core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _APIAccessService = inject(ApiManagerService)
  constructor(public localStorageService: StorageService, private _router: Router) {
  }
  authenticatedCheck = () => {
    this.localStorageService.loadToken();
    return this.localStorageService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          if (this.localStorageService.JWToken == "") {
            return false;
          }
          return false;
        }
      })
    );
  }
  getSystemLogin(body: any): Observable<any> {
    return this._APIAccessService.handleSendApiRequest(
      'post',
      'Auth',
      "GetLogin",
      body
    )
  }
}
