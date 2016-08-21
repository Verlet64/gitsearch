// import { AppComponent } from './app/app.component';
// import { bootstrap } from '@angular/platform-browser-dynamic';
// import { provideStore } from '@ngrx/store';
// import { ResultReducer, SelectedUserReducer} from './app/results/results.reducer';
// import { UserSearchService } from './app/shared/usersearch.service';
// import { disableDeprecatedForms, provideForms } from '@angular/forms';

// import { appRouterProviders } from './app/app.routes';


// bootstrap(AppComponent, [
//     appRouterProviders, //provides the routing for the application
//     UserSearchService, //consumes the store
//     provideStore({ResultReducer, SelectedUserReducer}), //defines app state
//     disableDeprecatedForms(), //disables deprecated form style
//     provideForms() //provides the new forms implementation
// ]);

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);