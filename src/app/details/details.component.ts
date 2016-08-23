import { Component, Input, OnInit } from '@angular/core';
import { UserSearchService } from '../shared/services/usersearch.service';
import { Router } from '@angular/router';


@Component ({
    selector: 'details-component',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

    private results;

    private resultsObj;

    private login;
    private location;
    private avatarUrl;
    private repos;

    constructor(private searchService: UserSearchService, private router: Router) {}

    //Gets the user details from the searchService by binding to an observable property
    getDetails(): void {
        this.results = this.searchService.detailResults$.subscribe(
            s => this.resultsObj = s 
        )
    }

    ngOnInit(): void {
        this.getDetails();
        this.assertDataExists();
    }

    //Check the data exists when the component is loaded - if not, redirect back to initial page, if so assign data to binds for easy use
    assertDataExists(): void{
        if(this.resultsObj === null){
            this.searchService.resetUserStore();
            this.router.navigate(['/search']);
        }
        else {
            this.extendDataBinds();
        }
    }

    //Binds data to properties for easy use in view template
    extendDataBinds(): void {
        this.login = this.resultsObj[0].login;
        this.location = this.resultsObj[0].location;
        this.avatarUrl = this.resultsObj[0].avatar_url;
        this.repos = this.resultsObj[1];
    }

    //Opens a link to the url passed in in a new tab
    goToRepo(url): void {
        window.open(url);
    }

}