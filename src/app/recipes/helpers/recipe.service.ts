import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe-model';
import { DataStorageService } from '../../shared/data-storage.service';
import { Ingredient } from '../../shopping-list/helpers/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/helpers/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[];
  @Output() recipeChanged = new Subject<Recipe>();
  @Output() recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
    this.recipes = [];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  clearRecipes() { this.recipes = []; this.recipesChanged.next([]); }

  getRecipe(index: number) {
    this.recipeChanged.next(this.recipes[index]);
    if (index >= 0 && index < this.recipes.length)
      return this.recipes[index]

    return null;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  addToShoppingList(recipe: Recipe) {
    return this.shoppingListService.addIngredients(recipe.ingredients);
  }

  deleteRecipe(index: number) {
    if (index >= this.recipes.length) return;
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }
}
