import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingFormComponent } from './shopping-form/shopping-form.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }])
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingFormComponent,
  ]
})
export class ShoppingListModule { }
