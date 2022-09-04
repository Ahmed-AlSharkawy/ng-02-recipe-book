import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../user.model';
import * as authActions from './auth.actions';

export interface AuthStateModel {
    user: User,
    error: HttpErrorResponse,
    isLoading: boolean
}

const initialState: AuthStateModel = {
    user: null,
    error: null,
    isLoading: false
};

export function authReducer(state = initialState, action: authActions.authActionType) {
    switch (action.type) {
        case authActions.AUTH_SUCCESS:
            return { ...state, user: action.payload, error: null };
        // return { ...state, user: action.payload, error: null, isLoading: false };

        case authActions.LOGIN_START:
        case authActions.SIGNUP_START:
            return { ...state, error: null, isLoading: true };


        case authActions.AUTH_FAIL:
            return { ...state, error: action.payload, isLoading: false };

        case authActions.LOGOUT:
            return { ...state, user: null, error: null, isLoading: false };

        case authActions.REMOVE_ERROR:
            return { ...state, error: null };

        default:
            return state;
    }
}
