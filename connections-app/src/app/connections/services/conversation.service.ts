import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, throwError } from 'rxjs';
import { IErrorResponse } from 'src/app/core/models/general.model';
import {
  usersResponseConverter,
  conversationsResponseConverter,
} from '../utils/response-converter.util';
import {
  IUserItem,
  IUsersResponse,
  IConversationItem,
  IConversationsResponse,
} from '../models/connections.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private httpClient: HttpClient) {}

  getUserList(): Observable<IUserItem[]> {
    return this.httpClient.get<IUsersResponse>('users').pipe(
      map((res) => usersResponseConverter(res)),
      catchError((error) =>
        throwError(
          (): IErrorResponse => ({
            action: 'userList',
            error: {
              message: error?.error?.message,
              type: error?.error?.type,
            },
          })
        )
      )
    );
  }

  getConversationsList(): Observable<IConversationItem[]> {
    return this.httpClient
      .get<IConversationsResponse>('conversations/list')
      .pipe(
        map((res) => conversationsResponseConverter(res)),
        catchError((error) =>
          throwError(
            (): IErrorResponse => ({
              action: 'conversationsList',
              error: {
                message: error?.error?.message,
                type: error?.error?.type,
              },
            })
          )
        )
      );
  }

  createConversation(companion: string): Observable<string> {
    return this.httpClient
      .post<{ conversationID: string }>('conversations/create', { companion })
      .pipe(
        map((res) => res.conversationID),
        catchError((error) =>
          throwError(
            (): IErrorResponse => ({
              action: 'conversationsList',
              error: {
                message: error?.error?.message,
                type: error?.error?.type,
              },
            })
          )
        )
      );
  }
}
