import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../shared/recipe.service';
import { Recipe } from '../recipe-model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipesSubscription: Subscription;


  constructor(private recipeService: RecipeService) {
    this.recipes = recipeService.getRecipes();
    this.recipesSubscription = recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
    );
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

  /* 
    onShowRecipeDetails(index: number) {
      this.recipeService.getRecipe(index);
    } 
  */
}
