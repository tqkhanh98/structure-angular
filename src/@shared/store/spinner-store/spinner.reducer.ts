import { ADD_SPINNER, REMOVE_SPINNER } from "src/@core";
import { SpinnerAction } from "./spinner.action";

export interface SpinnerState {
    spinnerArray: string[];
}

export const initSpinnerState: SpinnerState = {
    spinnerArray: []
}


export function spinnerReducer(state = initSpinnerState, action: SpinnerAction): SpinnerState {
    switch (action.type) {
        case ADD_SPINNER:
            return add(state?.spinnerArray);
        case REMOVE_SPINNER:
            return remove(state?.spinnerArray);
        default: return state;
    }
}

export const getSpinnerArray = ((state: SpinnerState): string[] => state.spinnerArray);

function add(arr: string[]): SpinnerState {
    return { spinnerArray: [...arr, '1'] };
}

function remove(arr: string[]): SpinnerState {
    return { spinnerArray: arr?.length ? arr.slice(1) : [] }
}