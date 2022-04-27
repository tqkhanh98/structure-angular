import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, UserService } from 'src/@core';
import { PostPaginationRequest, PostService } from 'src/@core/services/post';
import { NotificationController } from 'src/@shared';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  randomImg = 'https://picsum.photos/200/300';
  posts: Post[] = [];
  postRequest: PostPaginationRequest = new PostPaginationRequest();
  visibleSeeMore: boolean = true;
  totalPost: number = 0;
  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _toast: NotificationController) { }

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

  openPostForm(postId?: string) {
    const dialog = this._dialog.open(PostFormComponent, {
      width: '1080px',
      height: '400px',
      data: postId
    });
    dialog.afterClosed().subscribe(isSave => {
      isSave && this.getList();
    })
  }

  deletePost(id: string) {
    return this._postService.delete(id).subscribe(_ => this._toast.openSuccess('Delete successfully!').then(_ => this.getList()));
  }

}
