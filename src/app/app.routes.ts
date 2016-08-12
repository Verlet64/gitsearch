import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/search',
        pathMatch: 'full'
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'results',
        component: ResultsComponent
    }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);