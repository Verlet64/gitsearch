
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
        "login": "ASDasdas",
        "id": 418548,
        "avatar_url": "https://avatars.githubusercontent.com/u/418548?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/ASDasdas",
        "html_url": "https://github.com/ASDasdas",
        "followers_url": "https://api.github.com/users/ASDasdas/followers",
        "following_url": "https://api.github.com/users/ASDasdas/following{/other_user}",
        "gists_url": "https://api.github.com/users/ASDasdas/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/ASDasdas/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/ASDasdas/subscriptions",
        "organizations_url": "https://api.github.com/users/ASDasdas/orgs",
        "repos_url": "https://api.github.com/users/ASDasdas/repos",
        "events_url": "https://api.github.com/users/ASDasdas/events{/privacy}",
        "received_events_url": "https://api.github.com/users/ASDasdas/received_events",
        "type": "User",
        "site_admin": false,
        "score": 16.34549
    }

    results$: Observable<Array<Result>>;

    constructor(private http: Http, private store: Store<AppState>) {
        //use async pipe to subscribe to this in the template
        this.results$ = store.select(state => state.results)
        
    };

    loadUserResults(searchQuery?: string) {
        let payload;
        if(searchQuery){
            payload =  this.http.get(BASE_URL + '?q=' + searchQuery)
                .map( (res: Response) => res.json())
                .catch(this.handleError);
        }
        else {
            payload = []; //Resets state of results store to []
        }
        

        this.store.dispatch({type: 'ADD_RESULTS', payload: payload});
    };

    private handleError (error: any) {
        let err = (error.message) ? error.message : error.status;
        console.log(err);
        return Observable.throw(err);
    }


}