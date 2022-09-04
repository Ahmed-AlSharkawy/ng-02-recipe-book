import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponse, AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) { }

    authLogin$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((authData: AuthActions.LoginStart) => {
                return this.http.post<AuthResponse>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                    { ...authData.payload, returnSecureToken: true }
                ).pipe(
                    map((response) => new AuthActions.AuthSuccess(this.handleAuthResponse(response))),
                    catchError(error => of(new AuthActions.AuthFail({
                        ...error,
                        message: this.handleErrorResponse(error, this.authService.loginErrorResponses)
                    })))
                )
            })
        )
    });

    authSignup$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(AuthActions.SIGNUP_START),
            switchMap((authData: AuthActions.SignupStart) => {
                return this.http.post<AuthResponse>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                    { ...authData.payload, returnSecureToken: true }
                ).pipe(
                    map((response) => new AuthActions.AuthSuccess(this.handleAuthResponse(response))),
                    catchError(error => of(new AuthActions.AuthFail({
                        ...error,
                        message: this.handleErrorResponse(error, this.authService.signUpErrorResponses)
                    })))
                )
            })
        )
    });

    authSuccess$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(AuthActions.AUTH_SUCCESS),
            tap((authData: AuthActions.AuthSuccess) => {
                if (authData.redirect) this.router.navigate(['/']);
            })
        );
    }, { dispatch: false });

    authLogout$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGOUT),
            tap(() => {
                localStorage.removeItem('user');
                this.router.navigate(['/auth']);
                this.authService.clearLogoutTimer();
            })
        );
    }, { dispatch: false });

    authAutoLogin$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(AuthActions.AUTO_LOGIN),
            map(() => {

                const dummyType = { type: 'DUMMY_TYPE' };
                const user: { email: string, id: string, _token: string, _tokenExpirationDate: string }
                    = JSON.parse(localStorage.getItem('user'));
                if (!user) return dummyType;

                const loggedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
                if (!loggedUser.token) return dummyType;

                this.authService.autoLogout(new Date(user._tokenExpirationDate).getTime() - new Date().getTime());
                return new AuthActions.AuthSuccess(loggedUser, false);
            })
        );
    });

    handleAuthResponse(response: AuthResponse) {
        const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        const user = new User(response.email, response.localId, response.idToken, expirationDate);
        localStorage.setItem('user', JSON.stringify(user));
        this.authService.autoLogout(+response.expiresIn * 1000);
        return user;
    }

    private handleErrorResponse(error: HttpErrorResponse, errorResponses: {}) {
        let errorMessage = error.message ? error.message : 'Unknown Error!';
        if (error.error && error.error.error) {
            let message = error.error.error.message;
            errorMessage = errorResponses[message] != undefined ? errorResponses[message] : errorMessage;
        }
        return errorMessage;
    }
}
