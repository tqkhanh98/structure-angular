import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AddSpinner, NotificationController, RemoveSpinner } from 'src/@shared';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app/app.reducer';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    reqRun: any = 0
    constructor(
        private _toast: NotificationController,
        private readonly _store: Store<fromRoot.State>
    ) { }
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._store.dispatch(new AddSpinner);
        let header = new HttpHeaders().append('app-id', '625e6b41bbcf1e2f00aff2e9');
        return next.handle(httpRequest.clone({ headers: header })).pipe(
            finalize(() => {
                this._store.dispatch(new RemoveSpinner);
            }),
            catchError((err: HttpErrorResponse) => {
                err?.error && this._toast.openError(err?.error?.error);
                !err?.error && this._toast.openError('Request fail!');
                return throwError(err);
            })
        );
    }
}