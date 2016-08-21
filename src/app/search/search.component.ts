import { Component, Input, OnInit } from '@angular/core';

import { SearchQuery } from './searchquery.model';

import { UserSearchService } from '../shared/services/usersearch.service';
import { Observable, Subscription } from 'rxjs';

import { Result } from '../shared/interfaces/result.interface';

import { Store } from '@ngrx/store';
import { AppState } from '../shared/interfaces/appstate.interface';

import { ResultsComponent } from '../results/results.component';





@Component ({
    selector: 'search-form',
    templateUrl: 'src/app/search/search.component.html',
    directives: [ResultsComponent]
})

export class SearchComponent {

    public submitted: boolean;

    public model = new SearchQuery();

    private results$;

    private resultObj;



    constructor(private searchService: UserSearchService) {}

    getResults(): void {
        this.results$ = this.searchService.results$.subscribe(
            s => this.resultObj = s 
        )
    }

    ngOnInit() {
        this.getResults();
    }


    onSubmit() {
        this.submitted = true;
        this.searchService.searchUsers(this.model.username);
        console.log([...this.resultObj]);
        console.log(this.searchService.linkObj);
    }

    onClick(resultname) {
        this.searchService.searchUserDetails(resultname);
    }   

    
}