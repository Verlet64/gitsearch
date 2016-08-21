import { Component, Input, OnInit } from '@angular/core';

import { SearchQuery } from './searchquery.model';

import { UserSearchService } from '../shared/services/usersearch.service';
import { Observable, Subscription } from 'rxjs';

import { Result } from '../shared/interfaces/result.interface';

import { Store } from '@ngrx/store';
import { AppState } from '../shared/interfaces/appstate.interface';

import { ResultsComponent } from '../results/results.component';

import { Router } from '@angular/router';





@Component ({
    selector: 'search-form',
    templateUrl: 'src/app/search/search.component.html',
    directives: [ResultsComponent],
    styleUrls: ['src/app/search/search.component.css']
})

export class SearchComponent {

    public submitted: boolean;

    public model = new SearchQuery();

    private results$;

    private resultObj;


    constructor(private searchService: UserSearchService, private router: Router) {}

    //Get search results by binding to Observable property in UserSearchService
    getResults(): void {
        this.results$ = this.searchService.results$.subscribe(
            s => this.resultObj = s 
        )
    }

    ngOnInit() {
        this.getResults();
    }

    //Function to execute when submit button is pressed
    onSubmit() {
        this.submitted = true;
        this.searchService.searchUsers(this.model.username);
    }
    
    //Check if the 'next' property exists in the link header and return a boolean true if it does
    nextExists(){
        if(this.searchService.linkObj['next']){
            return true;
        }
    }

    //Handles waiting and event dispatching when function is called
    onClick(resultname) {

        this.searchService.searchUserDetails(resultname);
        
        let p =this.searchService.p();

        p.then(() => {
            if(this.searchService.detailResults$ !== null && this.searchService.detailResults$ !== undefined){
                //If the user detail + user repo observables are not undefined, redirect to details page
                this.redirect(); 
            }
        }, (err) => {
            console.log('Data not found')
        });

    }

    //When the 'next' button is pressed, load next page
    onNext() {
        this.searchService.nextPage();
    }

    //redirect to details page
    redirect(){
        this.router.navigate(['/details']);
    }

    
}