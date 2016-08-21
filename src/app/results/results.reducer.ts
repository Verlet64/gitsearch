import { AppState } from '../shared/interfaces/appstate.interface';
import { Result } from '../shared/interfaces/result.interface';
import { Observable } from 'rxjs';

import '@ngrx/core/add/operator/select';

/*
    type: string
    payload: any
*/

//Contains the user search results
export const ResultReducer = (state = [], {type, payload}) => {
    switch (type) {
        case 'ADD_RESULTS':
            return payload;
        default: 
            return state;
    };
}

//Contains the selected user details
export const SelectedUserReducer = (state: any = null, {type, payload}) => {
    switch (type) {
        case 'ADD_USER': 
            return payload;
        case 'ADD_REPOS':
            return [state, payload];
        default: 
            return state;
    }
}
