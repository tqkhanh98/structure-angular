import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP, PaginationResponse, requestQuery } from 'src/@core/constant';
import { Post, User } from 'src/@core/models';
import { PostPaginationRequest } from '../post/post.DTO';
import { UserRequest, UserRequestPagination } from './user.DTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = `${HTTP}user`
  constructor(
    private _https: HttpClient
  ) { }

  getAll(request: UserRequestPagination): Observable<PaginationResponse<User>> {
    return this._https.get<PaginationResponse<User>>(`${this.endpoint}?${requestQuery(request)}`);
  }

  getBy(id: string): Observable<User> {
    return this._https.get<User>(`${this.endpoint}/${id}`);
  }

  getPostsBy(id: string, requestBody: PostPaginationRequest): Observable<PaginationResponse<Post>> {
    return this._https.get<PaginationResponse<Post>>(`${this.endpoint}/${id}/post?${requestQuery(requestBody)}`)
  }

  create(requestBody: UserRequest): Observable<User> {
    return this._https.post<User>(this.endpoint + '/create', requestBody);
  }

  edit(requestBody: UserRequest, id: string): Observable<User> {
    return this._https.put<User>(this.endpoint + '/' + id, requestBody);
  }


}
