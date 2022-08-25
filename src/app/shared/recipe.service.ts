import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe-model';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[];
  @Output() recipeChanged = new Subject<Recipe>();
  @Output() recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
    this.recipes = [
      new Recipe(
        'new recipe',
        'this is the first recipe static item',
        'https://bestbeefrecipes.com/wp-content/uploads/2020/06/air-fried-steak-1.jpg',
        [
          new Ingredient('ingredient3', 2),
          new Ingredient('ingredient4', 1),
          new Ingredient('ingredient5', 5),
        ]
      ),
      new Recipe(
        'new recipe',
        'this is the first recipe static item',
        'https://static.onecms.io/wp-content/uploads/sites/9/2021/03/26/beef-wellington-FT-RECIPE0321.jpg',
        [
          new Ingredient('ingredient3', 1),
          new Ingredient('ingredient2', 2),
          new Ingredient('ingredient5', 2),
        ]
      ),
      new Recipe(
        'new recipe',
        'this is the first recipe static item',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMYhXWQEPCS-gMjJstqn8hydT0iHNLAevgQ&usqp=CAU',
        [
          new Ingredient('ingredient6', 5),
          new Ingredient('ingredient3', 3),
          new Ingredient('ingredient1', 2),
        ]
      ),
      new Recipe(
        'new recipe',
        'this is the first recipe static item',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxCpPZjE0f2qoQ1HprUPzgYYKt2UzHHLRdVw&usqp=CAU',
        [
          new Ingredient('ingredient1', 1),
          new Ingredient('ingredient4', 6),
          new Ingredient('ingredient2', 2),
        ]
      ),
    ];
  }

  getRecipes() {
    return this.recipes.slice();
  }

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
