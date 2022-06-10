import { Component, Inject, InjectionToken, OnInit, Provider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { UserService } from 'src/@core';
import { User } from 'src/@core/models/user';
import { queryParamFactory, routeParamFactory } from 'src/@core/services';


export const USER_ID = new InjectionToken<Observable<string>>('steam of id from route param');
export const SOME_PARAM = new InjectionToken<Observable<string>>('some param');
export const PROVIDERS: Provider[] = [
  {
    provide: USER_ID,
    useFactory: routeParamFactory('id'),
    deps: [ActivatedRoute]
  },
  {
    provide: SOME_PARAM,
    useFactory: queryParamFactory('someParam'),
    deps: [ActivatedRoute]
  }
]
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: PROVIDERS
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(
    @Inject(USER_ID) private idUser$: Observable<string>,
    @Inject(SOME_PARAM) private params$: Observable<string>,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.listenRoute();
  }

  listenRoute() {
    combineLatest({
      params: this.params$,
      idUser: this.idUser$,
    }).subscribe(response => {
      this.getBy(response.idUser);
    })
  }

  getBy(id: string) {
    return this._userService.getBy(id).subscribe(this.handleUser);
  }

  handleUser(user: User) {
    this.user = user;
    console.log(user);

  }

  onRedirectPosts(id: string) {
    return this._router.navigate(['user/posts', id]);
  }

}
