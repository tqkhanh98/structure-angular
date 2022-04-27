import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, of } from 'rxjs';
import { Post, PostDTORequest, PostService, User, UserService } from 'src/@core';
import { UserRequestPagination } from 'src/@core/services/user/user.DTO';
import { NotificationController } from 'src/@shared';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm!: FormGroup;
  users: User[] = [];
  tags: string[] = ['animal', 'dog', 'golden retriever', 'ice', 'mountain', 'pet', 'canine', 'human'];
  userRequest: UserRequestPagination = new UserRequestPagination();
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<PostFormComponent>,
    private _postService: PostService,
    private _toast: NotificationController,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public postId: string,
    private _datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.requestServices();
  }


  initForm() {
    this.postForm = this._fb.group({
      owner: ['', Validators.required],
      publishDate: [this._datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm'), Validators.required],
      tags: [[], Validators.required],
      text: ['', [Validators.required, Validators.max(50)]],
      likes: [this.randomLike()]
    });
  }

  requestServices() {
    forkJoin({
      user: this.getListUser(),
      post: this.getPostBy(this.postId)
    }).subscribe((response: any) => {
      this.handleUserRequest(response?.user?.data);
      this.postId && this.handlePostRequest(response?.post);
    })
  }

  handleUserRequest(response: User[]) {
    this.users = [...response];
  }

  handlePostRequest(response: Post) {
    this.postForm.patchValue({ ...response });
  }

  getListUser() {
    return this._userService.getAll(this.userRequest);
  }

  getPostBy(id: string) {
    if (id) return this._postService.getBy(id);
    return of(undefined);
  }

  confirm() {
    if (this.postForm.invalid) return;
    this.postId ? this.edit() : this.create();
  }

  edit() {
    let request: PostDTORequest = this.postForm?.value;
    let postId = this.postId;
    this._postService.edit(request, postId).subscribe(_ => {
      this._toast.openSuccess('Update post successfully!');
      this.closeDialog(true);
    })
  }

  create() {
    let request: PostDTORequest = this.postForm.value;
    this._postService.create(request).subscribe(_ => {
      this._toast.openSuccess('Create post successfully!');
      this.closeDialog(true);
    })
  }

  closeDialog(isSave: boolean) {
    return this._dialogRef.close(isSave);
  }

  seeMore() {
    this.userRequest.limit += 5;
    console.log(this.userRequest.limit)
    this.getListUser().subscribe(response => this.handleUserRequest(response?.data));
  }

  randomLike() {
    return Math.floor(Math.random() * (100 - 0 + 1)) + 0
  }

  public get checkForm() {
    return Object.keys(this.postForm?.controls).reduce((object: any, key) => {
      const formControl: any = this.postForm?.get(key);
      object[key] = formControl?.errors && (formControl?.dirty || formControl?.touched);
      return object;
    }, {});
  }
}
