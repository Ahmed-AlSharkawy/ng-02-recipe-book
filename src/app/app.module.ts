import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './shared/authentication/auth-interceptor.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert-component/alert.component';
import { ConfirmationComponent } from './shared/confirmation-component/confirmation.component';
import { PlaceholderDirective } from './shared/placeholder-directive/placeholder.directive';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
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
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    ConfirmationComponent,
    PlaceholderDirective,
  ],
  providers: [
    ShoppingListService, RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
