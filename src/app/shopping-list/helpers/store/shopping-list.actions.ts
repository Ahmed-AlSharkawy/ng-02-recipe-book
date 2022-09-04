import { Action } from "@ngrx/store";
import { Ingredient } from "../ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const CLEAR_INGREDIENTS = '[Shopping List] Clear Ingredients';
export const START_EDITING = '[Shopping List] Start Editing';
export const END_EDITING = '[Shopping List] End Editing';

export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload: Ingredient) { }
}

export class AddIngredients implements Action {
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }
}

export class UpdateIngredient implements Action {
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient) { }
}

export class DeleteIngredient implements Action {
    readonly type: string = DELETE_INGREDIENT;
}

export class ClearIngredients implements Action {
    readonly type: string = CLEAR_INGREDIENTS;
}

export class StartEditing implements Action {
    readonly type: string = START_EDITING;
    constructor(public payload: number) { }
}

export class EndEditing implements Action {
    readonly type: string = END_EDITING;
}

export type shoppingListActionType =
    AddIngredient & AddIngredients & UpdateIngredient & DeleteIngredient & ClearIngredients & StartEditing & EndEditing;
