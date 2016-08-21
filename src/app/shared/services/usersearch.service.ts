
import { Store } from '@ngrx/store';
import { ResultReducer } from '../../results/results.reducer';

import { AppState } from '../interfaces/appstate.interface';


import { Http, Response, Headers } from '@angular/http';
import { Result } from '../interfaces/result.interface';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';


const BASE_SEARCH_URL = 'https://api.github.com/search/users';
const BASE_USER_URL = 'https://api.github.com/users/';

@Injectable()
export class UserSearchService {

    private payload;
    private linkHeader;
    
    public linkObj = {};
    public results$;
    public detailResults$;


    constructor(private http: Http, private store: Store<AppState>) {
        this.results$ = store.select('results');
        this.detailResults$ = store.select('selectedusers');
    };

    

    searchUsers(searchQuery?: string, pageNum?: number) {

        if (searchQuery) {

            this.linkObj = {};

            let url = BASE_SEARCH_URL + '?q=' + searchQuery;

            if (pageNum) {
                url = url + '&page=' + pageNum;
            };

            this.http.get(url)
                .map(response => this.extractData(response))
                .map(response => response.items)
                .map(payload => ({type: 'ADD_RESULTS', payload}))
                .subscribe( 
                    action => this.store.dispatch(action)
                );
        }
        else {
            this.resetUserStore();
        }

    };

    nextPage() {

        let url = this.linkObj['next'];

        this.http.get(url)
            .map(response => this.extractData(response))
            .map(response => response.items)
            .map(payload => ({type: 'ADD_RESULTS', payload}))
            .subscribe( 
                action => this.store.dispatch(action)
            );

    }

    searchUserDetails(username: string){
        let url = BASE_USER_URL + username;

        this.http.get(url)
            .map(response => response.json())
            .map(payload => ({type: 'ADD_USER', payload}))
            .subscribe(
                action => this.store.dispatch(action)
            );
        
        this.searchUserRepos(username);
    };


    searchUserRepos(username: string){
        let url = BASE_USER_URL + username +'/repos';

        var repoData;

        this.http.get(url)
            .map(response => response.json())
            .map(x => _.sortBy(x, 'stargazers_count'))
            .map(x => x.slice(-3))
            .map(payload => ({type: 'ADD_REPOS', payload}))
            .subscribe(
                action => this.store.dispatch(action)
            )
    };

    resetUserStore(){
        this.payload = [];
        this.store.dispatch({type: 'ADD_RESULTS', payload: this.payload}) //Resets state of results store to []
    }

    extractData(res: any){
        if(res.headers.get('link')){
            this.parseLinkHeader(res.headers.get('link'));
        }
        res = res.json();
        return res;
    };

    parseLinkHeader(header){
        if(header.length === 0){
            return;
        }
        else {
            var chunk = header.split(',');

            for(var i = 0; i < chunk.length; i++){
                let section = chunk[i].split(';');
                let url = section[0].replace(/<(.*)>/, '$1').trim();
                let name = section[1].replace(/rel="(.*)"/, '$1').trim();
                this.linkObj[name] = url;
            }
        }
    };

    public p = () => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000)
        });
    }
}