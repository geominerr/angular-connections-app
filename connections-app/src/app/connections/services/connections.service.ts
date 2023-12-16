import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IGroupItem, IGroupsResponse } from '../models/connections.model';
import { groupResponseConverter } from '../utils/group-response-converter.util';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsService {
  constructor(private httpClient: HttpClient) {}

  getGroupList(): Observable<IGroupItem[]> {
    return this.httpClient.get<IGroupsResponse>('groups/list').pipe(
      map((res) => groupResponseConverter(res)),
      catchError((error) =>
        throwError(() => ({
          action: 'groupList',
          error: {
            message: error?.error?.message,
            type: error?.error?.type,
          },
        }))
      )
    );
  }

  createGroup(name: string): Observable<string> {
    return this.httpClient
      .post<{ groupID: string }>('groups/create', { name })
      .pipe(
        map((res) => res.groupID),
        catchError((error) =>
          throwError(() => ({
            action: 'groupCreate',
            error: {
              message: error?.error?.message,
              type: error?.error?.type,
            },
          }))
        )
      );
  }

  removeGroup(data: { groupID: string }): Observable<string> {
    const params: HttpParams = new HttpParams({ fromObject: data });

    return this.httpClient.delete<string>('groups/delete', { params }).pipe(
      map((res) => res),
      catchError((error) =>
        throwError(() => ({
          action: 'groupRemove',
          error: {
            message: error?.error?.message,
            type: error?.error?.type,
          },
        }))
      )
    );
  }
}
