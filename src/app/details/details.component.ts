import { Component, Input, OnInit } from '@angular/core';
import { UserSearchService } from '../shared/services/usersearch.service';
import { Router } from '@angular/router';


@Component ({
    selector: 'details-component',
    templateUrl: 'src/app/details/details.component.html',
    styleUrls: ['src/app/details/details.component.css']
})

export class DetailsComponent implements OnInit {

    private results;

    private resultsObj;

    private login;
    private location;
    private avatarUrl;
    private repos;

    constructor(private searchService: UserSearchService, private router: Router) {}

    getDetails(): void {
        this.results = this.searchService.detailResults$.subscribe(
            s => this.resultsObj = s 
        )
    }

    ngOnInit() {
        this.getDetails();
        this.assertDataExists();
    }

    assertDataExists(): void{
        if(this.resultsObj === null){
            this.searchService.resetUserStore();
            this.router.navigate(['/search']);
        }
        else {
            this.extendDataBinds();
        }
    }

    extendDataBinds(): void {
        this.login = this.resultsObj[0].login;
        this.location = this.resultsObj[0].location;
        this.avatarUrl = this.resultsObj[0].avatar_url;
        this.repos = this.resultsObj[1];
    }

    goToRepo(url): void {
        window.open(url);
    }

}