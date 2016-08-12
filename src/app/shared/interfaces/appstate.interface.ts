import {Result} from './result.interface';

export interface AppState {
    results: Result[];
    selectedResult: Result;
}