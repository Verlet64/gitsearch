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
    directives: [ResultsComponent]
})

export class SearchComponent {

    public submitted: boolean;

    public model = new SearchQuery();

    private results$;

    private resultObj;

    private getResultSuccess = false;



    constructor(private searchService: UserSearchService, private router: Router) {}

    getResults(): void {
        this.results$ = this.searchService.results$.subscribe(
            s => this.resultObj = s 
        )
    }

    ngOnInit() {
        console.log('resultsObj: ' + this.resultObj);
        this.getResults();
    }


    onSubmit() {
        this.submitted = true;
        this.searchService.searchUsers(this.model.username);
        if(this.resultObj === undefined){
            this.getResultSuccess = false;
        }
        else {
            this.getResultSuccess = true;
            console.log(this.getResultSuccess);
        }
    }

    onClick(resultname) {

        this.searchService.searchUserDetails(resultname);
        
        let p =this.searchService.p();

        p.then(() => {
            if(this.searchService.detailResults$ !== null && this.searchService.detailResults$ !== undefined){
                this.redirect();
            }
            else {
                console.log('No data loaded');
            }
        })

    }

    onNext() {
        this.searchService.nextPage();
    }

    redirect(){
        this.router.navigate(['/details']);
    }

    
}