import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ExceptionHandling } from '../functions/exceptionHandling';

type HTTPVerb = 'get' | 'post' | 'patch' | 'put' | 'delete';
@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  private http = inject(HttpClient);
  private exceptionHandling = new ExceptionHandling();

  private buildUrl(controllerName: string, methodName: string): string {
    return `${environment.RootAPIUrl}api/${controllerName}/${methodName}`;
  }

  private httpVerbsMap: Record<HTTPVerb, Function> = {
    get: (controller: string, method: string, params?: any): Observable<any> => {
      const url = this.buildUrl(controller, method);
      return this.exceptionHandling.errorHandling(
        this.http.get(url, { params: new HttpParams({ fromObject: params }) })
      );
    },
    post: (controller: string, method: string, body?: any): Observable<any> => {
      const url = this.buildUrl(controller, method);
      return this.exceptionHandling.errorHandling(this.http.post(url, body));
    },
    patch: (controller: string, method: string, body?: any): Observable<any> => {
      const url = this.buildUrl(controller, method);
      return this.exceptionHandling.errorHandling(this.http.patch(url, body));
    },
    put: (controller: string, method: string, body?: any): Observable<any> => {
      const url = this.buildUrl(controller, method);
      return this.exceptionHandling.errorHandling(this.http.put(url, body));
    },
    delete: (controller: string, method: string, params?: any): Observable<any> => {
      const url = this.buildUrl(controller, method);
      return this.exceptionHandling.errorHandling(
        this.http.delete(url, { params: new HttpParams({ fromObject: params }) })
      );
    },
  };

  handleSendApiRequest(
    verb: HTTPVerb,
    controller: string,
    method: string,
    payload?: any
  ): Observable<any> {
    const httpFn = this.httpVerbsMap[verb];
    if (!httpFn) throw new Error(`Unsupported HTTP verb: ${verb}`);
    return httpFn(controller, method, payload);
  }
}
