import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  private baseUrl = ' https://tasks.app.rs.school/angular';

  intercept(
    req: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<void>> {
    const modifiedReq = req.clone({ url: `${this.baseUrl}${req.url}` });

    return next.handle(modifiedReq);
  }
}
