
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './data/models/data.state';
import { DataReducer } from './data/data.reducer';

export const featureApp = 'app';

export interface AppState {
  app: AppRootState;
}

export interface AppRootState {
  data: DataState;
}

export const AppReducers = {
  data: DataReducer,
};

export const selecAppState = createFeatureSelector<AppRootState>(featureApp);
