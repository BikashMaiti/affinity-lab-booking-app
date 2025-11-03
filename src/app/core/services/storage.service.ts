import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { decrypt } from '../functions/encrypt-decrypt';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  token: string = '';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  get UserId(): any {
    if (isPlatformBrowser(this.platformId)) {
      var userId: any = localStorage.getItem('UserId');
      return Number(decrypt(userId));
    }
  }
  set UserId(value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('UserId', value);
    }
  }
  get JWToken(): any {
    if (isPlatformBrowser(this.platformId)) {
      var _JWToken: any;
      var _GetToken: any = localStorage.getItem('JWToken');
      var JWToken = _GetToken != null && _GetToken != undefined ? decrypt(_GetToken) : _GetToken;
      if (JWToken == null) {
        _JWToken = "";
      } else {
        _JWToken = JWToken
      }
      return _JWToken;
    }
  }
  set JWToken(value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('JWToken', value);
    }
  }
  async loadToken() {
    // let expiryDate = new Date(new Date().setHours(new Date().getHours()))
    // var nowTimeStamp = Math.round(expiryDate.getTime() / 1000);
    // if (this.expiration < nowTimeStamp) {
    //   this.logOut();
    // }
    const token = this.JWToken;
    const UserId = this.UserId;
    if (token && UserId) {
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  async logOut(): Promise<void> {
    this.isAuthenticated.next(false);
    if (isPlatformBrowser(this.platformId)) {
      return await localStorage.clear();
    }
  }
}
