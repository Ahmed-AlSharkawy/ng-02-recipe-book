import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/helpers/auth-interceptor.service';
import { RecipeService } from './recipes/helpers/recipe.service';
import { ShoppingListService } from './shopping-list/helpers/shopping-list.service';


@NgModule({
  providers: [
    ShoppingListService, RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class CoreModule { }
