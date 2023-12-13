import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { Observable, catchError, map, throwError } from 'rxjs';
import { IErrorResponse } from 'src/app/core/models/general.model';
import { IUserProfile, IProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  getProfile(): Observable<IUserProfile> {
    return this.httpClient.get<IProfile>('profile').pipe(
      map((res: IProfile) => {
        console.log(res);

        return {
          email: res?.email?.S,
          name: res?.name?.S,
          uid: res?.uid?.S,
          createdAt: res?.createdAt?.S,
        };
      }),
      catchError((error: HttpErrorResponse) =>
        throwError(
          (): IErrorResponse => ({
            action: 'profile',
            error: {
              type: error?.error?.type,
              message: error?.error?.message,
            },
          })
        )
      )
    );
  }

  updateProfile(name: string): Observable<boolean> {
    return this.httpClient.put<HttpResponse<string>>('profile', { name }).pipe(
      map((res: HttpResponse<string>) => {
        console.log(res);
        return true;
      }),
      catchError((error: HttpErrorResponse) =>
        throwError(
          (): IErrorResponse => ({
            action: 'profileUpdate',
            error: {
              type: error?.error?.type,
              message: error?.error?.message,
            },
          })
        )
      )
    );
  }
}
