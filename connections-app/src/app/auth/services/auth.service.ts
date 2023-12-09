import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, catchError, map, throwError } from 'rxjs';

import {
  IUser,
  ILoginData,
  ILoginInfo,
  ILoginResponse,
} from '../models/user.model';
import { ISigninResponse, ISignupResponse } from '../models/responses.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  existEmails: string[] = [];

  signupTypeError: string = 'PrimaryDuplicationException';

  signinTypeError: string = 'NotFoundException';

  constructor(private httpClient: HttpClient) {}

  signupUser(user: IUser): Observable<ISignupResponse> {
    return this.httpClient
      .post<Response>('/registration', user, { observe: 'response' })
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((res: HttpResponse<any>) => ({
          status: res.status,
          result: true,
          email: user.email,
        })),
        catchError((error) =>
          throwError(() => {
            if (
              error?.error?.type === this.signupTypeError &&
              !this.existEmails.includes(user.email)
            ) {
              this.existEmails.push(user.email);
            }

            return [...this.existEmails];
          })
        )
      );
  }

  signinUser(loginData: ILoginData): Observable<ILoginResponse> {
    return this.httpClient
      .post<Response>('/login', loginData, { observe: 'response' })
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((res: HttpResponse<any>) => {
          return {
            status: res.status,
            authInfo: {
              token: res?.body?.token,
              uid: res?.body?.uid,
              email: loginData.email,
            },
          };
        }),
        catchError((error) =>
          throwError(() => {
            console.log(error);
            if (error?.error?.type === this.signinTypeError) {
              return true;
            }

            return false;
          })
        )
      );
  }
}
