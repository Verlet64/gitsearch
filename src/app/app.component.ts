import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Result } from './shared/interfaces/result.interface';

import { Store } from '@ngrx/store';
import { AppState } from './shared/interfaces/appstate.interface';
import { Router } from '@angular/router';

import { UserSearchService } from './shared/services/usersearch.service';


@Component({
    selector: 'my-app',
    templateUrl: 'src/app/app.component.html',
    styles: [`
        body {
            padding: 0;
        }

        .navbar {
            background-color: #625D5D;
            text-align: center;
        }

        .title {
            color: white;
            font-family: 'Poiret One', cursive;
            line-height: 50px;
            font-size: 30px;
        }
        
        a {
            color: white;
        }

        a:hover {
            color: white;
        }

        a:active {
            color: white;
        }

    `],
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
    results$: Observable<Array<Result>>;
    selectedResult$: Observable<Result>;

    constructor(private searchService: UserSearchService, private store: Store<AppState>, private router: Router) {
        this.results$ = searchService.results$;
        searchService.searchUsers(); //on initial component load, we run loadUserResults to propogate the state of the results collection
    }

}