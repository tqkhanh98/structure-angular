import { Action } from "@ngrx/store";
import { ADD_SPINNER, REMOVE_SPINNER } from "src/@core";

export class AddSpinner implements Action {
    readonly type = ADD_SPINNER;
};

export class RemoveSpinner implements Action {
    readonly type = REMOVE_SPINNER;
};

export type SpinnerAction = AddSpinner | RemoveSpinner;