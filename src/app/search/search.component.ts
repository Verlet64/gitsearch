import { Component, Input } from '@angular/core';

import { SearchQuery } from './searchquery.model';

import { UserSearchService } from '../shared/services/usersearch.service';
import { Observable, Subscription } from 'rxjs';

import { Result } from '../shared/interfaces/result.interface';


@Component ({
    selector: 'search-form',
    templateUrl: 'src/app/search/search.component.html'
})

export class SearchComponent {

    public submitted: boolean;

    public model = new SearchQuery();

    @Input() results$: Result[];

    constructor(private searchService: UserSearchService) { 
    }

    onSubmit() {
        this.submitted = true;
        this.searchService.loadUserResults(this.model.username);
        console.log(this.results$);
    }

    
}