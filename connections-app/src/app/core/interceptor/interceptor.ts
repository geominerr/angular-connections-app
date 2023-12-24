import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers/user.reducer';
import { IHeadersAuth } from '../models/general.model';

@Injectable()
export class Interceptor implements HttpInterceptor {
  baseUrl = 'https://tasks.app.rs.school/angular/';

  localStorageKey: string = '~_polymer_^<_^_>^_appState_~';

  mapEndpoints: Record<string, boolean> = {
    profile: true,
    logout: true,
    groups: true,
    users: true,
    conversations: true,
  };

  intercept(
    req: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<void>> {
    let headers: IHeadersAuth | null = null;

    const stateFromLS: string | null = localStorage.getItem(
      this.localStorageKey
    );

    if (stateFromLS) {
      const parsedState: State = JSON.parse(stateFromLS);

      headers = {
        'rs-uid': parsedState?.loginInfo?.uid || '',
        'rs-email': parsedState?.loginInfo?.email || '',
        Authorization: `Bearer ${parsedState?.loginInfo?.token}`,
      };
    }

    if (this.mapEndpoints?.[req.url.split('/')[0]] && headers) {
      const modifiedReq = req.clone({
        url: `${this.baseUrl}${req.url}`,
        setHeaders: { ...headers },
      });

      return next.handle(modifiedReq);
    }

    const modifiedReq = req.clone({ url: `${this.baseUrl}${req.url}` });

    return next.handle(modifiedReq);
  }
}
