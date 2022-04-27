import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HTTP, PaginationResponse, requestQuery } from "src/@core/constant";
import { Post } from "src/@core/models/post";
import { PostDTORequest, PostPaginationRequest } from "./post.DTO";

@Injectable({ providedIn: 'root' })
export class PostService {

    endpoint: string = 'post';
    constructor(private _http: HttpClient) { }

    getPosts(request: PostPaginationRequest, tag?: string): Observable<PaginationResponse<Post>> {
        let stringUrl = tag ? `tag/${tag}/` : '';
        return this._http.get<PaginationResponse<Post>>(`${HTTP + stringUrl + this.endpoint}?${requestQuery(request)}`);
    }

    getBy(postId: string): Observable<Post> {
        return this._http.get<Post>(HTTP + this.endpoint + `/` + postId);
    }

    create(requestBody: PostDTORequest): Observable<Post> {
        return this._http.post<Post>(HTTP + this.endpoint + '/create', requestBody);
    }

    edit(requestBody: PostDTORequest, id: string): Observable<Post> {
        return this._http.put<Post>(HTTP + this.endpoint + '/' + id, requestBody);
    }

    delete(id: string) {
        return this._http.delete(HTTP + this.endpoint + `/` + id)
    }

}