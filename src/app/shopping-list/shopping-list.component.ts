import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from './helpers/ingredient.model';
import { ShoppingListService } from './helpers/shopping-list.service';
import { StartEditing } from './helpers/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private ingredientsSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppStateModel>
  ) {

    this.ingredients = store.select('shoppingList');
    // this.ingredients = shoppingListService.getIngredients();
    // this.ingredientsSubscription = shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    // );
  }

  ngOnInit() { }

  ngOnDestroy() {
    // this.ingredientsSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEditing(index))
    // this.shoppingListService.startEditing(index);
  }
}
