import { Component, Input } from '@angular/core';

import { SearchQuery } from './searchquery.model';

import { UserSearchService } from '../shared/services/usersearch.service';
import { Observable, Subscription } from 'rxjs';

import { Result } from '../shared/interfaces/result.interface';

import { Store } from '@ngrx/store';
import { AppState } from '../shared/interfaces/appstate.interface';


@Component ({
    selector: 'search-form',
    templateUrl: 'src/app/search/search.component.html'
})

export class SearchComponent {

    public submitted: boolean;

    public model = new SearchQuery();

    results$;

    resultObj;



    constructor(private searchService: UserSearchService) { 
        this.results$ = searchService.results$.subscribe(
            s => this.resultObj = s.map( x => {return x.avatar_url})
        )
    }


    onSubmit() {
        this.submitted = true;
        this.searchService.loadUserResults(this.model.username);
        console.log(this.resultObj);
    }

    
}