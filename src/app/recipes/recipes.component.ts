import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from './recipe-model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  // recipe: Recipe;

  constructor(private recipeService: RecipeService) {
    // recipeService.reecipeChanged.subscribe((recipe) => (this.recipe = recipe));
  }

  ngOnInit() { }

}
