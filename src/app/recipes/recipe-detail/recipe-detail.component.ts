import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../helpers/recipe.service';
import { Recipe } from '../helpers/recipe-model';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { DeleteRecipe } from '../helpers/store/recipes.actions';
import { AddIngredients } from 'src/app/shopping-list/helpers/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  index: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppStateModel>) { }

  ngOnInit() {
    this.route.params.pipe(
      map(params => +params['id']),
      switchMap(id => { this.index = id; return this.store.select('recipes') }),
      map(recipesState => recipesState.recipes.find((value, index) => index == this.index)),
    ).subscribe(recipe => {
      if (recipe) this.recipe = recipe;
      else this.router.navigate(['/recipes']);
    })

    // this.route.params.subscribe(params => {
    //   this.index = +params['id'];
    //   this.recipe = this.recipeService.getRecipe(+params['id']);
    //   if (!this.recipe) this.router.navigate(['/recipes']);
    // })
  }

  addToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
    // this.recipeService.addToShoppingList(this.recipe);
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(+this.index);
    this.store.dispatch(new DeleteRecipe(this.index));
    this.router.navigate(['recipes']);
  }
}
