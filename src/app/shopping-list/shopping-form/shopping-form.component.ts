import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../helpers/ingredient.model';
import { ShoppingListService } from '../helpers/shopping-list.service';
import { AddIngredient, DeleteIngredient, EndEditing, UpdateIngredient } from '../helpers/store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromShoppingList from '../helpers/store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css'],
})
export class ShoppingFormComponent implements OnInit, OnDestroy {

  @ViewChild('form', { static: false }) form: NgForm;
  private ingredientsSubscription: Subscription;
  editMode: boolean;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppStateModel>) {
    this.editMode = false;
  }

  ngOnInit() {

    this.ingredientsSubscription = this.store.select('shoppingList').subscribe(
      (stateData: fromShoppingList.ShoppingListStateModel) => {
        if (stateData.index > -1) {
          this.editMode = true;
          this.form.setValue(stateData.editedIngredient)
        } else {
          this.editMode = false;
        }
      }
    );

    // this.ingredientsSubscription = this.shoppingListService.editIngredientStart.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.index = index;
    //     this.form.setValue(this.shoppingListService.getIngredient(index))
    //   }
    // );
  }

  onSubmitForm() {
    if (this.form.invalid) return;
    console.log(this.form);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient(this.form.value));
      // this.shoppingListService.editIngredient(this.index, this.form.value.name, this.form.value.amount);
    }
    else {
      this.store.dispatch(new AddIngredient(this.form.value))
      // this.shoppingListService.addIngredient(this.form.value.name, this.form.value.amount);
    }
    this.onResetForm();
  }

  onResetForm() {
    this.form.reset();
    this.store.dispatch(new EndEditing());
  }

  deleteIngredient() {
    if (!this.editMode) return;
    this.store.dispatch(new DeleteIngredient());
    // this.shoppingListService.deleteIngredient(this.index);
    this.onResetForm();
  }

  ngOnDestroy() {
    this.store.dispatch(new EndEditing());
    this.ingredientsSubscription.unsubscribe();
  }
}
