import { Ingredient } from "../ingredient.model";
import * as shoppingListActions from './shopping-list.actions';

export interface ShoppingListStateModel {
    index: number,
    editedIngredient: Ingredient,
    ingredients: Ingredient[]
}

const initialState: ShoppingListStateModel = {
    index: -1,
    editedIngredient: null,
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatos', 10), new Ingredient('salt', 7)]
};

export function shoppingListReducer(state = initialState, action: shoppingListActions.shoppingListActionType) {
    switch (action.type) {
        case shoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.map((ingredient: Ingredient) =>
                    ingredient.name.toLowerCase() === action.payload.name.toLowerCase()
                        ? { ...ingredient, amount: ingredient.amount + action.payload.amount }
                        : ingredient
                )
            };

        case shoppingListActions.ADD_INGREDIENTS:
            let newIngredients: Ingredient[] = [...state.ingredients];

            action.payload.forEach((newIngredient: Ingredient) => {
                let found = false;
                newIngredients = newIngredients.map((ingredient: Ingredient) => {
                    if (ingredient.name.toLowerCase() === newIngredient.name.toLowerCase()) {
                        found = true;
                        return { ...ingredient, amount: ingredient.amount + newIngredient.amount };
                    }
                    return ingredient;
                });
                newIngredients = found ? newIngredients : [...newIngredients, newIngredient];
            })

            return { ...state, ingredients: newIngredients };

        case shoppingListActions.UPDATE_INGREDIENT:
            return state.index < 0
                ? state
                : {
                    ...state,
                    ingredients: state.ingredients.map(
                        (ingredient: Ingredient, index: number) =>
                            index == state.index ? action.payload : ingredient
                    )
                }

        case shoppingListActions.DELETE_INGREDIENT:
            return state.index < 0
                ? state
                : {
                    ...state,
                    ingredients: state.ingredients.filter(
                        (ingredient: Ingredient, index: number) => index != state.index
                    )
                }

        case shoppingListActions.START_EDITING:
            return action.payload >= state.ingredients.length || action.payload < 0
                ? state
                : { ...state, index: action.payload, editedIngredient: { ...state.ingredients[action.payload] } };

        case shoppingListActions.END_EDITING:
            return { ...state, index: -1, editedIngredient: null };

        default:
            return state;
    }
}
