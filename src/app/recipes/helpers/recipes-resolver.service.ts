import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from './recipe-model';
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
