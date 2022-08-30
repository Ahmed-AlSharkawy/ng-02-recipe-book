import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/helpers/auth-guard';
import { RecipesResolverService } from './helpers/recipes-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipesComponent } from './recipes.component';

const recipesRoutes: Routes = [
  {
    path: '', component: RecipesComponent,
    canActivate: [AuthGuard],
    resolve: [RecipesResolverService],
    children: [
      { path: 'view/:id', component: RecipeDetailComponent },
      { path: 'add', component: RecipeFormComponent },
      { path: 'edit/:id', component: RecipeFormComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule { }
