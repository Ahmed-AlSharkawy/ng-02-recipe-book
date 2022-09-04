import { HttpErrorResponse } from '@angular/common/http';
import { Recipe } from '../recipe-model';
import * as recipesActions from './recipes.actions';

export interface RecipesStateModel {
    recipes: Recipe[]
}

const initialState: RecipesStateModel = {
    recipes: [],
};

export function recipesReducer(state = initialState, action: recipesActions.recipesActionType) {
    switch (action.type) {
        case recipesActions.SET_RECIPES:
            return { ...state, recipes: action.payload };

        case recipesActions.ADD_RECIPE:
            return { ...state, recipes: [...state.recipes, action.payload] };

        case recipesActions.UPDATE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.map((recipe, index) => index == action.payload.index ? action.payload.recipe : recipe)
            };

        case recipesActions.DELETE_RECIPE:
            return { ...state, recipes: state.recipes.filter((recipe, index) => index != action.payload) };

        default:
            return state;
    }
}
