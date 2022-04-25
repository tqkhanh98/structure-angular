import { Action } from "@ngrx/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "src/@core";
import { AuthActions } from "./auth.action";

export interface AuthState {
    isAuthenticated: boolean;
}

export const initState: AuthState = {
    isAuthenticated: false,
}

export function authReducer(state = initState, action: AuthActions): AuthState {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return setState(true);
        case SET_UNAUTHENTICATED:
            return setState(false);
        default: return state;
    }
}

function setState(state: boolean): any {
    return { isAuthenticated: state };
}
export const getIsAuth = (state: AuthState): boolean => state.isAuthenticated;