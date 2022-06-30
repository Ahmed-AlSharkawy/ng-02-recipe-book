import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[];
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor() {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatos', 10),
      new Ingredient('another', 7),
      new Ingredient('yet another', 12),
    ];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }
}
