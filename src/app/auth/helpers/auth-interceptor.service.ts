import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, take } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromApp.AppStateModel>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(state => state.user),
      exhaustMap(user => {
        if (!user) return next.handle(req);
        return next.handle(req.clone({ params: new HttpParams().set('auth', user.token) }))
      })
    );
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     if (!user) return next.handle(req);
    //     return next.handle(req.clone({ params: new HttpParams().set('auth', user.token) }))
    //   })
    // );
  }
}
