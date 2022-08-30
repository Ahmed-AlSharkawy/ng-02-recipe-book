import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeService } from '../../recipes/helpers/recipe.service';
import { User } from './user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer;

  private signUpErrorResponses = {
    'EMAIL_EXISTS': 'The email address is already in use by another account.',
    'OPERATION_NOT_ALLOWED': 'Password sign -in is disabled for this project.',
    'TOO_MANY_ATTEMPTS_TRY_LATER': 'We have blocked all requests from this device due to unusual activity.Try again later.',
  }

  private loginErrorResponses = {
    "EMAIL_NOT_FOUND": "There is no user record corresponding to this identifier.The user may have been deleted.",
    "INVALID_PASSWORD": "The password is invalid or the user does not have a password.",
    "USER_DISABLED": "The user account has been disabled by an administrator.",
  }

  constructor(private http: HttpClient, private router: Router, private recipeService: RecipeService) { }

  signUp(credintials: {}) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      { ...credintials, returnSecureToken: true }
    ).pipe(
      catchError(error => this.handleErrorResponse(error, this.signUpErrorResponses)),
      tap(response => this.handleAuthResponse(response))
    );
  }

  login(credintials: {}) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      { ...credintials, returnSecureToken: true }
    ).pipe(
      catchError(error => this.handleErrorResponse(error, this.loginErrorResponses)),
      tap(response => this.handleAuthResponse(response))
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    this.recipeService.clearRecipes();
    localStorage.removeItem('user');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  autoLogin() {
    const user: { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (!user) return;
    const loggedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
    if (!loggedUser.token) return;
    this.user.next(loggedUser);
    this.autoLogout(new Date(user._tokenExpirationDate).getTime() - new Date().getTime());
  }

  handleAuthResponse(response: AuthResponse) {
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    const user = new User(response.email, response.localId, response.idToken, expirationDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.autoLogout(+response.expiresIn * 1000);
  }

  private handleErrorResponse(error: HttpErrorResponse, errorResponses: {}) {
    let errorMessage = error.message ? error.message : 'Unknown Error!';
    if (error.error && error.error.error) {
      let message = error.error.error.message;
      errorMessage = errorResponses[message] != undefined ? errorResponses[message] : errorMessage;
    }
    return throwError(() => { return { ...error, message: errorMessage } })
  }
}
