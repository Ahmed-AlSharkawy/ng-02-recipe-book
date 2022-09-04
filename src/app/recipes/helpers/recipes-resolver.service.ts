import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, switchMap, take } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as fromApp from 'src/app/store/app.reducer';
import { Recipe } from './recipe-model';
import { RecipeService } from './recipe.service';
import { FetchRecipes, SET_RECIPES } from './store/recipes.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private recipeService: RecipeService,
    private dataStorage: DataStorageService,
    private store: Store<fromApp.AppStateModel>,
    private actions$: Actions
  ) { }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipeService.getRecipes();
    // const recipes = this.store.select('recipes').subscribe(state => );
    // return recipes.length === 0 ? this.dataStorage.fetchRecipes() : recipes;

    return this.store.select('recipes').pipe(take(1), map(state => state.recipes), switchMap(recipes => {
      if (recipes.length > 0) return of(recipes);

      this.store.dispatch(new FetchRecipes());
      this.store.select('recipes').pipe(take(1), map(state => state.recipes)).subscribe(recipes => console.log('Your recipes have been loaded from the server'))
      return this.actions$.pipe(ofType(SET_RECIPES), take(1));
    }))
  }
}
