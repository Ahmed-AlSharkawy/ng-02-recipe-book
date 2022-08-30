import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert-component/alert.component';
import { ConfirmationComponent } from './confirmation-component/confirmation.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder-directive/placeholder.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    ConfirmationComponent,
    PlaceholderDirective,
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    AlertComponent,
    ConfirmationComponent,
    PlaceholderDirective,
  ],
})
export class SharedModule { }
