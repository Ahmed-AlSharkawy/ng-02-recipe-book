import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { Recipe } from '../recipes/helpers/recipe-model';
import { AuthService } from '../auth/helpers/auth.service';
import { RecipeService } from '../recipes/helpers/recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { SetRecipes } from '../recipes/helpers/store/recipes.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppStateModel>
  ) { }

  storeRecipes() {
    return this.http.put(
      'https://ng-recipe-book-bf1a3-default-rtdb.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-recipe-book-bf1a3-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes =>
          recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          })
        ),
        tap(recipes =>
          this.store.dispatch(new SetRecipes(recipes))
          // this.recipeService.setRecipes(recipes)
        )
      );

    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user =>
    //     this.http.get<Recipe[]>(
    //       'https://ng-recipe-book-bf1a3-default-rtdb.firebaseio.com/recipes.json',
    //       { params: new HttpParams().set('auth', user.token) }
    //     )
    //   ),
    //   map(recipes =>
    //     recipes.map(recipe => {
    //       return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
    //     })
    //   ),
    //   tap(recipes => this.recipeService.setRecipes(recipes))
    // );
  }
}
