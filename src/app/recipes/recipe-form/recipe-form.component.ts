import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shopping-list/helpers/ingredient.model';
import { RecipeService } from 'src/app/recipes/helpers/recipe.service';
import { Recipe } from '../helpers/recipe-model';
import { AppStateModel } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AddRecipe, UpdateRecipe } from '../helpers/store/recipes.actions';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  index: number | undefined;
  isUpdate: boolean;
  recipe: Recipe;
  recipeForm: FormGroup;
  storeSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService,
    private store: Store<AppStateModel>) {

    this.recipe = { name: '', description: '', imagePath: '', ingredients: [] }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.index = +params['id'];
      this.isUpdate = params['id'] != undefined;
      this.initForm();
    })
  }

  private initForm() {
    if (this.isUpdate) {
      this.storeSubscription = this.store.select('recipes').pipe(map(recipeState => recipeState.recipes.find((value, index) => index == this.index)))
        .subscribe(recipe => {
          if (!recipe) this.router.navigate(['/recipes']);
          this.recipe = recipe;
          this.setFormControls();
        });
    } else this.setFormControls();
  }

  private setFormControls() {
    let ingredientsArray = this.isUpdate ? [] : [new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
    })];

    for (const ingredient of this.recipe.ingredients) {
      ingredientsArray.push(new FormGroup({
        'name': new FormControl(ingredient.name, Validators.required),
        'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)]),
      }))
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe.name, Validators.required),
      description: new FormControl(this.recipe.description, Validators.required),
      imagePath: new FormControl(this.recipe.imagePath, Validators.required),
      ingredients: new FormArray(ingredientsArray)
    })
  }

  onSubmit() {
    // let recipeObj = {
    //   'name': this.recipeForm.get('name').value,
    //   'description': this.recipeForm.get('description').value,
    //   'imagePath': this.recipeForm.get('imagePath').value,
    //   'ingredients': []
    // }

    // for (const ingredient of (<FormArray>this.recipeForm.get('ingredients')).controls) {
    //   recipeObj.ingredients.push({
    //     'name': ingredient.get('name').value,
    //     'amount': ingredient.get('amount').value,
    //   })
    // }

    if (this.isUpdate) {
      this.store.dispatch(new UpdateRecipe({ index: this.index, recipe: this.recipeForm.value }))
      // this.recipeService.updateRecipe(this.index, this.recipeForm.value)
    } else {
      this.store.dispatch(new AddRecipe(this.recipeForm.value))
      // this.recipeService.addRecipe(this.recipeForm.value)
    }
    console.log(this.recipeService.getRecipes());
    this.goBack();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.goBack();
  }

  goBack() {
    this.router.navigate(this.isUpdate ? ['recipes', 'view', this.index] : ['recipes']);
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) this.storeSubscription.unsubscribe()
  }
}
