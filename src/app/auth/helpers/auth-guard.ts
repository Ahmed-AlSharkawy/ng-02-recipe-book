import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import * as fromApp from "src/app/store/app.reducer";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
        private store: Store<fromApp.AppStateModel>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(state => state.user),
            map(user => !!user ? true : this.router.createUrlTree(['/auth']))
        );
        // return this.authService.user.pipe(take(1), map(user => !!user ? true : this.router.createUrlTree(['/auth'])));
    }
}
