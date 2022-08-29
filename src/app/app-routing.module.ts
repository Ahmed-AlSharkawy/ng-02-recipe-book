import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthGuard } from './shared/authentication/auth-guard';
import { RecipesResolverService } from './shared/recipes-resolver.service';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard],
    resolve: [RecipesResolverService],
    children: [
      { path: 'view/:id', component: RecipeDetailComponent },
      { path: 'add', component: RecipeFormComponent },
      { path: 'edit/:id', component: RecipeFormComponent }
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule { }
