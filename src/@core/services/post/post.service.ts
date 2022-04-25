import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HTTP, PaginationResponse, requestQuery } from "src/@core/constant";
import { Post } from "src/@core/models/post";
import { PostRequest } from "./post.DTO";

@Injectable({ providedIn: 'root' })
export class PostService {

    endpoint: string = 'post';
    constructor(private _http: HttpClient) { }

    getPosts(request: PostRequest, tag?: string): Observable<PaginationResponse<Post>> {
        let stringUrl = tag ? `tag/${tag}/` : '';
        return this._http.get<PaginationResponse<Post>>(`${HTTP + stringUrl + this.endpoint}?${requestQuery(request)}`);
    }

}