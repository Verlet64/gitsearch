import { Component, Input } from '@angular/core';



@Component ({
    selector: 'search-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})

export class ResultsComponent {

    //Receive result from parent component, search component
    @Input() result: any;

}

// private searchService: UserSearchService
// this.results = searchService.results;