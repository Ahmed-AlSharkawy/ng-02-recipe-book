import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from './helpers/ingredient.model';
import { ShoppingListService } from './helpers/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.ingredients = shoppingListService.getIngredients();
    this.ingredientsSubscription = shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing(index);
  }
}
