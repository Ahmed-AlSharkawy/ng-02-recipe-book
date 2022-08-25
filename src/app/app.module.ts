import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingFormComponent } from './shopping/shopping-list/shopping-form/shopping-form.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListService } from './shared/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';
import { RecipeService } from './shared/recipe.service';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingFormComponent,
    RecipeFormComponent,
  ],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
