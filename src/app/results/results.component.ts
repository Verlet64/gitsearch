import { Component, Input } from '@angular/core';



@Component ({
    selector: 'search-results',
    templateUrl: 'src/app/results/results.component.html'
})

export class ResultsComponent {

    @Input() result: any;

}

// private searchService: UserSearchService
// this.results = searchService.results;