import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Result } from './shared/interfaces/result.interface';

import { Store } from '@ngrx/store';
import { AppState } from './shared/interfaces/appstate.interface';
import { UserSearchService } from './shared/services/usersearch.service';


@Component({
    selector: 'my-app',
    template: `
        <h1> {{title}} </h1>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
    results$: Observable<Array<Result>>;
    selectedResult$: Observable<Result>;

    constructor(private searchService: UserSearchService, private store: Store<AppState>) {
        this.results$ = searchService.results$;
        searchService.loadUserResults(); //on initial component load, we run loadUserResults to propogate the state of the results collection
    }
}