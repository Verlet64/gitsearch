import { Component, Input } from '@angular/core';

import { Result } from '../shared/interfaces/result.interface';
import { ResultReducer } from './results.reducer';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/interfaces/appstate.interface';


import { UserSearchService } from '../shared/services/usersearch.service';

@Component ({
    selector: 'search-results',
    templateUrl: 'src/app/results/results.component.html'
})

export class ResultsComponent {

    public results$;

    public resultObj;

     constructor(private searchService: UserSearchService) { 
        this.results$ = searchService.results$.subscribe(
            s => this.resultObj = JSON.stringify(s)
        )
    }

}

// private searchService: UserSearchService
// this.results = searchService.results;