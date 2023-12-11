import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers/user.reducer';

@Injectable()
export class Interceptor implements HttpInterceptor {
  baseUrl = 'https://tasks.app.rs.school/angular/';

  localStorageKey: string = '~_polymer_^<_^_>^_appState_~';

  mapEndpoints: Record<string, boolean> = {
    profile: true,
  };

  intercept(
    req: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<void>> {
    const stateFromLS: State = JSON.parse(
      localStorage.getItem(this.localStorageKey) || ''
    );

    const headers = {
      'rs-uid': stateFromLS?.loginInfo?.uid || '',
      'rs-email': stateFromLS?.loginInfo?.email || '',
      Authorization: `Bearer ${stateFromLS?.loginInfo?.token}`,
    };

    if (this.mapEndpoints?.[req.url] && headers?.['rs-uid']) {
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
