import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, take, withLatestFrom } from "rxjs";
import * as fromApp from "src/app/store/app.reducer";
import { Recipe } from "../recipe-model";
import * as RecipesActions from "./recipes.actions";
import { RecipesStateModel } from "./recipes.reducer";

@Injectable()
export class RecipesEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppStateModel>
    ) { }

    fetchRecipes$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(RecipesActions.FETCH_RECIPES),
            switchMap((authData: RecipesActions.FetchRecipes) =>
                this.http.get<Recipe[]>('https://ng-recipe-book-bf1a3-default-rtdb.firebaseio.com/recipes.json')
            ), map(recipes =>
                recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            ), map(recipes => new RecipesActions.SetRecipes(recipes))
        )
    });

    storeRecipes$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([authData, recipeState]) =>
                this.http.put(
                    'https://ng-recipe-book-bf1a3-default-rtdb.firebaseio.com/recipes.json',
                    recipeState.recipes
                )
            ),
        )
    }, { dispatch: false });
}
