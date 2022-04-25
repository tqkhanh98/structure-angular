import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/@core';
import { User } from 'src/@core/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user!: User;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.listenRoute();
  }

  listenRoute() {
    let id = this._route.snapshot.paramMap.get('id') || '';
    this.getBy(id);
  }

  getBy(id: string) {
    return this._userService.getBy(id).subscribe(user => this.user = user);
  }

  onRedirectPosts(id: string) {
    return this._router.navigate(['user/posts', id]);
  }

}
