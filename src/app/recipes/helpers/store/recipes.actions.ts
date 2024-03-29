import { Action } from "@ngrx/store";
import { Recipe } from "../recipe-model";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const STORE_RECIPES = '[Recipes] Store Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';

export class SetRecipes implements Action {
    readonly type: string = SET_RECIPES;
    constructor(public payload: Recipe[]) { }
}

export class FetchRecipes implements Action {
    readonly type: string = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
    readonly type: string = STORE_RECIPES;
}

export class AddRecipe implements Action {
    readonly type: string = ADD_RECIPE;
    constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
    readonly type: string = UPDATE_RECIPE;
    constructor(public payload: { index: number, recipe: Recipe }) { }
}

export class DeleteRecipe implements Action {
    readonly type: string = DELETE_RECIPE;
    constructor(public payload: number) { }
}



export type recipesActionType = SetRecipes & FetchRecipes & StoreRecipes & AddRecipe & UpdateRecipe & DeleteRecipe; 
