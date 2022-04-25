
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormLogin } from 'src/@core/models';
import { NotificationController } from 'src/@shared';
import * as fromRoot from '../../../app/app.reducer';
import * as Auth from '../../../app/authentication/login/auth-store';
@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(
        private _router: Router,
        private _notiService: NotificationController,
        private _store: Store<fromRoot.State>,
    ) {
        this.checkAuthenticated();
    }

    checkAuthenticated() {
        this._store.dispatch(new Auth.SetAuthenticated);
        this.getAccountFromStore() && this.onAuthenticated(true);
    }

    onAuthenticated(value: boolean) {
        this.authenticated$.next(value);
    }

    get isAuthenticated(): Observable<boolean> {
        this._store.select(fromRoot.getIsAuth);
        return of(this.authenticated$.value && this.getAccountFromStore());
    }

    setAccountToStore(formAccount: FormLogin) {
        localStorage.setItem('authenticate', JSON.stringify(formAccount));
    }

    getAccountFromStore() {
        return !!localStorage.getItem('authenticate');
    }

    onLogout() {
        this._store.dispatch(new Auth.SetUnAuthenticated);
        localStorage.clear();
        this._notiService.openSuccess('Logout successfully!');
        this._router.navigate(['login']);
    }

}