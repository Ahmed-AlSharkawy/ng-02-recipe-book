import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/authentication/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

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

  constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => this.isAuthenticated = !!user);
  }

  storeRecipes() {
    this.dataStorage.storeRecipes().subscribe(response => alert('Your recipes have been stored in the server'));
  }

  fetchRecipes() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
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
  }
}
