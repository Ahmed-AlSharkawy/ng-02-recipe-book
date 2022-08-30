import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ReactiveFormsModule, SharedModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }])
  ],
  declarations: [
    AuthComponent,
  ]
})
export class AuthModule { }
