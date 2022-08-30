import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../helpers/recipe.service';
import { Recipe } from '../helpers/recipe-model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  index: number;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    console.log('run');

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.index = +params['id'];
      this.recipe = this.recipeService.getRecipe(+params['id']);
      if (!this.recipe) this.router.navigate(['/recipes']);
    })
  }

  addToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(+this.index);
    this.router.navigate(['recipes'])
  }
}
