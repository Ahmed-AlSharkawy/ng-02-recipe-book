import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../shared/recipe.service';
import { Recipe } from '../recipe-model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {
    this.recipes = recipeService.getRecipes();
  }

  ngOnInit() {}
  
/* 
  onShowRecipeDetails(index: number) {
    this.recipeService.getRecipe(index);
  } 
*/
}
