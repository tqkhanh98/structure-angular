import { Action } from "@ngrx/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "src/@core";

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}
export class SetUnAuthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnAuthenticated;