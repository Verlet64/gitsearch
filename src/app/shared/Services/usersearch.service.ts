
import { Store } from '@ngrx/store';
import { ResultReducer } from '../../results/results.reducer';

import { AppState } from '../interfaces/appstate.interface';


import { Http, Response } from '@angular/http';
import { Result } from '../interfaces/result.interface';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


const BASE_URL = 'https://api.github.com/search/users';

@Injectable()
export class UserSearchService {

    private mockResults = {
        avatar_url: "https://avatars.githubusercontent.com/u/418548?v=3"
    }

    public results$;
    private payload;

    constructor(private http: Http, private store: Store<AppState>) {
        //use async pipe to subscribe to this in the template
        this.results$ = store.select('results')
        
    };

    loadUserResults(searchQuery?: string, pageNum?: number) {

        console.log(searchQuery);
        if (searchQuery) {
            let url = BASE_URL + '?q=' + searchQuery;
            if (pageNum) {
                url = url + '&page=' + pageNum;
            }
            this.http.get(url)
                .map(response => response.json())
                .map(response => response.items)
                .map(payload => ({type: 'ADD_RESULTS', payload}))
                .subscribe( 
                    action => this.store.dispatch(action)
                );
        }
        else {
            this.payload = []; //Resets state of results store to []
        }

    };

    private handleError (error: any) {
        let err = (error.message) ? error.message : error.status;
        console.log('error:' + err);
        return Observable.throw(err);
    }


}