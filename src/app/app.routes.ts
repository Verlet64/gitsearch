import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { DetailsComponent } from './details/details.component';

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
    },
    {
        path: 'details',
        component: DetailsComponent
    }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);