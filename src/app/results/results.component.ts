import { Component, Input } from '@angular/core';



@Component ({
    selector: 'search-results',
    templateUrl: 'src/app/results/results.component.html',
    styleUrls: ['src/app/results/results.component.css']
})

export class ResultsComponent {

    @Input() result: any;

}

// private searchService: UserSearchService
// this.results = searchService.results;