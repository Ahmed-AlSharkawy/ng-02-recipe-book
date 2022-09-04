import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, VERSION } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/helpers/auth.service';
import { AutoLogin } from './auth/helpers/store/auth.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppStateModel>,
    // @inject(PLATFORM_ID) private platformID
  ) { }

  ngOnInit(): void {

    // console.log('hello from ' + this.platformID);

    // if (isPlatformBrowser(this.platformID))
    this.store.dispatch(new AutoLogin());
    // this.authService.autoLogin();
  }

  // view: string = 'recipe';
  // onChangeView(viewName) {
  //   this.view = viewName;
  // }
}
