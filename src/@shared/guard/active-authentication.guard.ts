import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../../@core';
import * as fromRoot from '../../app/app.reducer';
@Injectable({
  providedIn: 'root'
})
export class ActiveAuthenticationGuard implements CanActivate {
  constructor(private readonly authService: AuthenticationService,
    private store: Store<fromRoot.State>,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    this.store.select(fromRoot.getIsAuth).subscribe(val => {
      if (!val) {
        this.router.navigate(['/login']);
        return of(false);
      }
    })
    return of(true);


  }



}
