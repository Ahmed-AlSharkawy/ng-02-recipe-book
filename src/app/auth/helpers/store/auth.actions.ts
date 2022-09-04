import { HttpErrorResponse } from "@angular/common/http";
import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN_START = '[Auth] Login Start';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTH_SUCCESS = '[Auth] Success';
export const AUTH_FAIL = '[Auth] Fail';
export const LOGOUT = '[Auth] Logout';
export const REMOVE_ERROR = '[Auth] Remove Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';

export class LoginStart implements Action {
    readonly type: string = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class SignupStart implements Action {
    readonly type: string = SIGNUP_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class AuthSuccess implements Action {
    readonly type: string = AUTH_SUCCESS;
    constructor(public payload: User, public redirect: boolean = true) { }
}

export class AuthFail implements Action {
    readonly type: string = AUTH_FAIL;
    constructor(public payload: HttpErrorResponse) { }
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
}

export class RemoverError implements Action {
    readonly type: string = REMOVE_ERROR;
}

export class AutoLogin implements Action {
    readonly type: string = AUTO_LOGIN;
}

export class AutoLogout implements Action {
    readonly type: string = AUTO_LOGOUT;
}

export type authActionType = LoginStart & SignupStart & AuthSuccess & AuthFail & Logout & RemoverError & AutoLogin & AutoLogout;
