import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../app/authentication/login/auth-store';
import * as fromSpinner from '../@shared/store/spinner-store';


export interface State {
    auth: fromAuth.AuthState,
    spinner: fromSpinner.SpinnerState
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer,
    spinner: fromSpinner.spinnerReducer
};

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export const getSpinnerState = createFeatureSelector<fromSpinner.SpinnerState>('spinner');
export const getSpinnerArray = createSelector(getSpinnerState, fromSpinner.getSpinnerArray);