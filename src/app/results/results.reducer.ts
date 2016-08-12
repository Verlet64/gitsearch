import { AppState } from '../shared/interfaces/appstate.interface';
import { Result } from '../shared/interfaces/result.interface';
import { Observable } from 'rxjs';

import '@ngrx/core/add/operator/select';

/*
    type: string
    payload: any
*/

export const ResultReducer = (state = [], {type, payload}) => {
    switch (type) {
        case 'ADD_RESULTS':
            return payload;
        default: 
            return state;
    };
}

export const SelectedUserReducer = (state: any = null, {type, payload}) => {
    switch (type) {
        case 'SELECT_RESULT': {
            return payload;
        }
        default: 
            return state;
    }
}

//TODO: Refactor so this is more composable i.e getResult()

export function getResults(){
    return (state$: Observable<AppState>) => state$
        .select(state => state);
}