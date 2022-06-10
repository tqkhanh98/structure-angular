import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/@core';
import { User } from 'src/@core/models/user';
import { UserRequestPagination } from 'src/@core/services/user/user.DTO';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  request: UserRequestPagination = new UserRequestPagination();
  visibleSeeMore: boolean = true;
  totalUser: number = 0;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this._userService.getAll(this.request).subscribe(response => {
      this.users = [...response?.data];
      this.totalUser = response?.total;
    })
  }

  onRedirectDetail(id: string) {
    this._router.navigate(['/user/detail', id], { queryParams: { someParam: 'param nè' } });
  }

  onRedirectPosts(id: string) {
    return this._router.navigate(['post/list-by-user', id]);
  }

  seeMore() {
    this.request.limit += 20;
    this.getList();
    (this.request.limit >= this.totalUser) && (this.visibleSeeMore = false);
  }

  openUserForm(idUser?: string) {
    const dialog = this._dialog.open(UserFormComponent, {
      width: '1080px',
      height: '280px',
      data: idUser
    });
    dialog.afterClosed().subscribe(isSave => {
      isSave && this.getList();
    })
  }

}
