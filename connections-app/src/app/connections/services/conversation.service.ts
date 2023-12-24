import { HttpClient, HttpParams } from '@angular/common/http';
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
import {
  IConversation,
  IConversationResponse,
} from '../models/conversation.model';

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

  deleteConversation(conversationID: string): Observable<string> {
    const params = new HttpParams({ fromObject: { conversationID } });

    return this.httpClient
      .delete<string>('conversations/delete', { params })
      .pipe(
        map((res) => res),
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

  getConversationMessages(data: {
    conversationID: string;
    since?: number;
  }): Observable<IConversation> {
    const params = new HttpParams({ fromObject: data });

    return this.httpClient
      .get<IConversationResponse>('conversations/read', { params })
      .pipe(
        map((res): IConversation => {
          const timeStamp: number = new Date().getTime();

          return { since: timeStamp, items: res.Items };
        }),
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

  sendConversationMessages(data: {
    conversationID: string;
    message: string;
  }): Observable<string> {
    return this.httpClient
      .post<string>('conversations/append', { ...data })
      .pipe(
        map((res) => res),
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
