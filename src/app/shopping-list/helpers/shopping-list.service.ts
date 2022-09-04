import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[];
  ingredientsChanged = new Subject<Ingredient[]>();
  editIngredientStart = new Subject<number>();

  constructor() {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatos', 10),
      new Ingredient('apples', 7),
      new Ingredient('yet another', 12),
    ];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    if (index >= this.ingredients.length) return null;

    return this.ingredients[index];
  }

  addIngredient(name: string, amount: number) {
    let found: boolean = false;
    for (const ingredient of this.ingredients) {
      if (ingredient.name.toLowerCase() === name.toLowerCase()) {
        found = true;
        ingredient.amount += amount;
        break;
      }
    }

    if (!found) this.ingredients.push(new Ingredient(name, amount));

    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    for (const ingredient of ingredients)
      this.addIngredient(ingredient.name, ingredient.amount);

    this.ingredientsChanged.next(this.getIngredients());
  }

  startEditing(index: number) {
    if (index >= this.ingredients.length) return;

    this.editIngredientStart.next(index);
  }

  editIngredient(index: number, name: string, amount: number) {
    if (index >= this.ingredients.length) return;
    this.ingredients[index].name = name;
    this.ingredients[index].amount = amount;

    this.ingredientsChanged.next(this.getIngredients());
  }

  deleteIngredient(index: number) {
    if (index >= this.ingredients.length) return;
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.getIngredients());
  }
}
