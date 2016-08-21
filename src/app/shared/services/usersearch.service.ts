
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
    
    public linkObj = {}; //holds link header properties as separate propertys that can be accessed by key and readily used
    public results$;
    public detailResults$;


    constructor(private http: Http, private store: Store<AppState>) {
        this.results$ = store.select('results');
        this.detailResults$ = store.select('selectedusers');
    };

    
    //Searches for users
    searchUsers(searchQuery?: string, pageNum?: number): void {

        if (searchQuery) {
            //Reset linkObj on the service
            this.linkObj = {};

            //build the URL
            let url = BASE_SEARCH_URL + '?q=' + searchQuery;

            if (pageNum) {
                url = url + '&page=' + pageNum;
            };

            //get request, dispatch event to update store with data from request
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

    //Goes to the next page of user results
    nextPage(): void {
        //set url to the 'next' property of linkObj
        let url = this.linkObj['next'];

        //get request, dispatch event to update store with data from request
        this.http.get(url)
            .map(response => this.extractData(response))
            .map(response => response.items)
            .map(payload => ({type: 'ADD_RESULTS', payload}))
            .subscribe( 
                action => this.store.dispatch(action)
            );

    }

    //Searches for a users details
    searchUserDetails(username: string): void{

        //build url with username
        let url = BASE_USER_URL + username;

        //get request, dispatch event to update store with data from request
        this.http.get(url)
            .map(response => response.json())
            .map(payload => ({type: 'ADD_USER', payload}))
            .subscribe(
                action => this.store.dispatch(action)
            );

        //Search user repos
        this.searchUserRepos(username);
    };

    //Searches a users repos and returns the top 3 ordered by stargazers_count
    searchUserRepos(username: string): void{
        //build url with username
        let url = BASE_USER_URL + username +'/repos';

        //get request, dispatch event to update store with data from request
        this.http.get(url)
            .map(response => response.json())
            //use underscore _.sortBy to sort by property, stargazers_count
            .map(x => _.sortBy(x, 'stargazers_count'))
            //get top 3
            .map(x => x.slice(-3))
            .map(payload => ({type: 'ADD_REPOS', payload}))
            .subscribe(
                action => this.store.dispatch(action)
            )
    };

    //resets the user/results store (not the selected user store)
    resetUserStore(): void{
        this.payload = [];
        this.store.dispatch({type: 'ADD_RESULTS', payload: this.payload}) //Resets state of results store to []
    }

    //extracts data from the response, including headers and returns the response once .json() is applied
    extractData(res: any): any{
        if(res.headers.get('link')){
            this.parseLinkHeader(res.headers.get('link'));
        }
        res = res.json();
        return res;
    };

    //parses the link headers and stores the properties in linkObj
    parseLinkHeader(header): void{
        if(header.length === 0){
            return;
        }
        else {
            //split linkheader string by comma into two chunks, stored in an array 
            var chunk = header.split(',');

            for(var i = 0; i < chunk.length; i++){
                let section = chunk[i].split(';');
                //capture the url enclosed by <()>, and replace the string in the 0th index with the captured group, and trim any whitespace
                let url = section[0].replace(/<(.*)>/, '$1').trim();
                //capture the name enclosed by rel="<name>", and replace the string in the 1st index with the captured group, and trim any whitespace
                let name = section[1].replace(/rel="(.*)"/, '$1').trim();
                //create a property on linkObj out of these captured strings
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