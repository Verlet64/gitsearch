/*
========================
CORE
========================
*/

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routes';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';


/*
========================
COMPONENTS
========================
*/
import { AppComponent }  from './app.component';
import { SearchComponent }  from './search/search.component';

/*
========================
SERVICES & PROVIDERS
========================
*/

import { provideStore, combineReducers } from '@ngrx/store';
import { ResultReducer, SelectedUserReducer} from './results/results.reducer';
import { UserSearchService } from './shared/services/usersearch.service';
import { appRoutingProviders } from './app.routes';
import {storeLogger} from "ngrx-store-logger";
import {compose} from "@ngrx/core/compose";

/*
========================
DIRECTIVES 
========================
*/

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    JsonpModule 
    ],
  providers: [
    appRoutingProviders, //router dependencies specification
    UserSearchService, //consumes the store
    provideStore(compose(storeLogger(), combineReducers)({results: ResultReducer, SelectedUserReducer})), //defines app state
    ],
  declarations: [ 
      AppComponent,
      SearchComponent
   ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }