import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() onViewChanged = new EventEmitter<string>();
  active: string = 'recipe';

  constructor() {}

  ngOnInit() {}

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
}
