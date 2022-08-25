import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../../../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css'],
})
export class ShoppingFormComponent implements OnInit, OnDestroy {

  @ViewChild('form', { static: false }) form: NgForm;
  private ingredientsSubscription: Subscription;
  editMode: boolean;
  index: number;

  constructor(private shoppingListService: ShoppingListService) {
    this.editMode = false;
    this.index = null;
  }

  ngOnInit() {

    this.ingredientsSubscription = this.shoppingListService.editIngredientStart.subscribe(
      (index: number) => {
        this.editMode = true;
        this.index = index;
        this.form.setValue(this.shoppingListService.getIngredient(index))
      }
    );
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }

  onSubmitForm() {
    if (this.form.invalid) return;
    console.log(this.form);
    if (this.editMode) this.shoppingListService.editIngredient(this.index, this.form.value.name, this.form.value.amount);
    else this.shoppingListService.addIngredient(this.form.value.name, this.form.value.amount);
    this.onResetForm();
  }

  onResetForm() {
    this.form.reset();
    this.editMode = false;
    this.index = null;
  }

  deleteIngredient() {
    if (!this.editMode) return;
    this.shoppingListService.deleteIngredient(this.index);
    this.onResetForm();
  }
}
