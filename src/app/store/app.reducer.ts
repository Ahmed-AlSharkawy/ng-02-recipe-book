import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "../auth/helpers/store/auth.reducer";
import * as fromRecipes from "../recipes/helpers/store/recipes.reducer";
import * as fromShoppingList from "../shopping-list/helpers/store/shopping-list.reducer";

export interface AppStateModel {
    shoppingList: fromShoppingList.ShoppingListStateModel
    auth: fromAuth.AuthStateModel
    recipes: fromRecipes.RecipesStateModel
};

export const appReducer: ActionReducerMap<AppStateModel> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipesReducer
};
