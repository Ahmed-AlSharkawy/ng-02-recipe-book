import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../helpers/recipe.service';
import { Recipe } from '../helpers/recipe-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipesSubscription: Subscription;
  noRecipes: boolean;

  confirmationMessage: { header: string, message: string };
  showConfirmDialog: boolean;
  noRecipesMessage: { header: string, title: string, message: string, type: string, icon: string };
  showAlert: boolean;

  constructor(private recipeService: RecipeService, private router: Router) {
    this.showConfirmDialog = false;
    this.confirmationMessage = null;
    this.showAlert = false;
    this.noRecipesMessage = {
      header: 'Error',
      title: 'No Recipes',
      message: 'There are no recipes to display, try to fetch recipes from the server or start adding new recipes.',
      type: 'danger',
      icon: 'bug'
    };

    this.recipes = recipeService.getRecipes();
    this.noRecipes = !this.recipes.length;
    this.showAlert = !this.recipes.length;

    this.recipesSubscription = recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes; this.noRecipes = !recipes.length; this.showAlert = !recipes.length;
      }
    );
  }

  ngOnInit() { }

  clearRecipes() {
    this.confirmationMessage = { header: 'Clear Recipes', message: 'Are you sure you want to delete all recipes?' };
    this.showConfirmDialog = true;
  }

  onClearRecipes(confirmed: boolean) {
    this.showConfirmDialog = false;
    if (confirmed) {
      this.recipeService.clearRecipes();
      this.router.navigate(['/recipes']);
    }
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }
}
