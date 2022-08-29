import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe-model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private recipeService: RecipeService, private dataStorage: DataStorageService) { }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    return recipes.length === 0 ? this.dataStorage.fetchRecipes() : recipes;
  }
}
