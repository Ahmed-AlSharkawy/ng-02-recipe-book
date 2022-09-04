import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, Subscription, take } from 'rxjs';
import { AuthService } from '../auth/helpers/auth.service';
import { Logout } from '../auth/helpers/store/auth.actions';
import { FetchRecipes, SET_RECIPES, StoreRecipes } from '../recipes/helpers/store/recipes.actions';
import { ConfirmationComponent } from '../shared/confirmation-component/confirmation.component';
import { DataStorageService } from '../shared/data-storage.service';
import { PlaceholderDirective } from '../shared/placeholder-directive/placeholder.directive';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() onViewChanged = new EventEmitter<string>();
  // active: string = 'recipe';

  private userSubscription: Subscription;
  isAuthenticated: boolean;
  private confirmationRef: ViewContainerRef;

  @ViewChild(PlaceholderDirective) confirmationHost: PlaceholderDirective;
  private confirmationSubscription: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppStateModel>,
    private actions$: Actions
  ) { }

  ngOnInit() {
    this.store.select('auth').pipe(map(state => state.user)).subscribe(user => this.isAuthenticated = !!user)
    // this.userSubscription = this.authService.user.subscribe(user => this.isAuthenticated = !!user);
  }

  storeRecipes() {
    this.confirmationSubscription = this.confirmAction({ header: 'Store Reciepes', message: 'Are you sure you want to strore recipes on the server ?' }).subscribe(confirmed => {
      this.confirmationSubscription.unsubscribe();
      this.confirmationRef.clear();
      if (confirmed)
        this.store.dispatch(new StoreRecipes());
      // this.dataStorage.storeRecipes().subscribe(response => alert('Your recipes have been stored in the server'));
    });
  }

  fetchRecipes() {
    this.confirmationSubscription = this.confirmAction({ header: 'Fetch Reciepes', message: 'Are you sure you want to fetch recipes from the server ?' }).subscribe(confirmed => {
      this.confirmationSubscription.unsubscribe();
      this.confirmationRef.clear();
      if (confirmed) {
        this.store.dispatch(new FetchRecipes());
        this.actions$.pipe(ofType(SET_RECIPES), take(1)).subscribe(response => alert('Your recipes have been loaded from the server'));
      }
      // this.dataStorage.fetchRecipes().subscribe(response => alert('Your recipes have been loaded from the server'));
    });
  }

  confirmAction(message: { header: string, message: string }): EventEmitter<boolean> {
    this.confirmationRef = this.confirmationHost.viewContainerRef;
    this.confirmationRef.clear();
    const component = this.confirmationRef.createComponent(ConfirmationComponent);
    component.instance.message = message;
    return component.instance.close;

  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new Logout());
  }

  /* OLD NAVIGATION APPROACH
   onShowRecipe() {
      if (this.active == 'recipe') return;
      console.log('info');
      this.active = 'recipe';
      this.onViewChanged.emit('recipe');
    }

    onShowShoppingList() {
      if (this.active == 'shoppinglist') return;
      this.active = 'shoppinglist';
      this.onViewChanged.emit('shoppinglist');
    }
  */

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    if (this.confirmationSubscription) this.confirmationSubscription.unsubscribe();
  }
}
