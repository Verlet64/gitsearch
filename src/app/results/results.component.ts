import { Component, Input } from '@angular/core';

import { Result } from '../shared/interfaces/result.interface';
import { ResultReducer } from './results.reducer';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/interfaces/appstate.interface';

@Component ({
    selector: 'search-results',
    templateUrl: 'src/app/results/results.component.html'
})

export class ResultsComponent {

   @Input() results$: Result[];

}

// private searchService: UserSearchService
// this.results = searchService.results;