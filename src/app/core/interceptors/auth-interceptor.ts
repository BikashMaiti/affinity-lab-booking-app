import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { decrypt } from '../functions/encrypt-decrypt';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const tokenData = localStorage.getItem('JWToken');
  const JWToken = tokenData ? decrypt(tokenData) : '';
  const isFormData = request.body instanceof FormData;
  const isLoginApi = request.url.includes(`${environment.RootAPIUrl}api/Auth/GetLogin`);

  let headers = request.headers;

  // Skip setting headers for login or file uploads
  if (isLoginApi) {
    headers = headers.set('Content-Type', 'application/json');
  } else if (isFormData || request.url.includes('FileUpload')) {
    headers = headers.set('Authorization', `Bearer ${JWToken}`);
  } else {
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${JWToken}`);
  }

  const modifiedReq = request.clone({ headers:headers });
  return next(modifiedReq);
};
