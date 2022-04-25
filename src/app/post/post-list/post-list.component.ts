import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, UserService } from 'src/@core';
import { PostRequest, PostService } from 'src/@core/services/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  postRequest: PostRequest = new PostRequest();
  visibleSeeMore: boolean = true;
  totalPost: number = 0;
  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listenRoute();
  }

  listenRoute() {
    let idUser = this._route.snapshot.paramMap.get('id') || '';
    let tag = this._route.snapshot.paramMap.get('tag') || '';
    if (idUser) return this.getUserPostsBy(idUser);
    if (tag) return this.getPostsBy(tag);
    else return this.getList();
  }

  getList() {
    this._postService.getPosts(this.postRequest).subscribe(response => {
      this.posts = [...response?.data];
      this.totalPost = response?.total;
    })
  }

  getUserPostsBy(idUser: string) {
    this._userService.getPostsBy(idUser, this.postRequest).subscribe(response => {
      this.posts = [...response?.data];
      this.totalPost = response?.total;
    })
  }

  getPostsBy(tag: string) {
    this._postService.getPosts(this.postRequest, tag).subscribe(response => {
      this.posts = [...response?.data];
      this.totalPost = response?.total;
    })
  }

  onRedirectUserDetail(id: string) {
    this._router.navigate(['/user/detail', id]);
  }

  onRedirectPostByTag(tag: string) {
    this._router.navigate(['/post/list-by-tag', tag]);
  }

  seeMore() {
    this.postRequest.limit += 20;
    this.getList();
    (this.postRequest.limit >= this.totalPost) && (this.visibleSeeMore = false);
  }

}
