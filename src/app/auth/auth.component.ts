import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { map, Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { AuthResponse, AuthService } from './helpers/auth.service';
import { LoginStart, Logout, RemoverError, SignupStart } from './helpers/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('containerState', [
      state('login', style({
        transform: 'scale(1)', rotate: '0deg', backgroundColor: '#10ff001a', border: '2px solid #ff00f752',
        backgroundImage: 'linear-gradient(140deg, rgb(234, 222, 219) 0%, rgb(255 140 140) 25%, rgb(203 237 15 / 47%) 50%, rgb(237 97 15 / 47%) 75%, rgb(52 255 0 / 47%) 100%)'
      })),
      state('signup', style({
        transform: 'scale(1)', rotate: '0deg', backgroundColor: '#ff00f714', border: '2px solid #10ff0054',
        backgroundImage: 'linear-gradient(140deg, rgba(52, 255, 0, 0.47) 0%, rgba(237, 97, 15, 0.47) 25%, rgba(203, 237, 15, 0.47) 50%, rgb(255 140 140) 75%, rgb(234, 222, 219) 100%)'
      })),
      transition('login => signup', [animate(750, style({ transform: 'scale(0)' })), animate(750)]),
      transition('signup => login', [animate(750, style({ rotate: 'y 90deg' })), animate(750)]),
    ]),
    trigger('emailError', [
      state('', style({ transform: 'translateX(0) scale(1)' })),
      transition('void => *', [style({ transform: 'translateX(-700px) scale(0)' }), animate(500)]),
      transition('* => void', [animate(500, style({ transform: 'translateX(500px) scale(0)' }))]),
    ]),
    trigger('passwordError', [
      state('', style({ transform: 'rotate(0) scale(1)' })),
      transition('void => *', [style({ transform: 'rotate(360deg) scale(0)' }), animate(500)]),
      transition('* => void', [animate(500, style({ transform: 'rotate(360deg) scale(0)' }))]),
    ]),
    trigger('errorMSG', [
      state('', style({ transform: 'translateY(0)', opacity: '1', })),
      transition('void => *', animate(1000, keyframes([
        style({ transform: 'translateY(500px)', opacity: '0', offset: '0', }),
        style({ transform: 'translateY(150px)', opacity: '0.4', offset: '0.25', }),
        style({ transform: 'translateY(-250px)', opacity: '0.8', offset: '0.75', }),
        style({ transform: 'translateY(0)', opacity: '1', offset: '1', })
      ]))),
      transition('* => void', animate(5000, keyframes([
        style({ opacity: '1', offset: '0', }),
        style({ transform: 'scale(1.25,1.25)', opacity: '0.8', offset: '0.25', }),
        style({ transform: 'scale(0.75,0.75)', opacity: '0.4', offset: '0.75', }),
        style({ opacity: '0', offset: '1', })
      ]))),
    ]),
  ]
})
export class AuthComponent implements OnInit, OnDestroy {

  temp = ''
  states: string[];
  reactiveForm: FormGroup;
  loginMode: boolean;
  submitting: boolean = false;
  message: { header: string, title: string, message: string, type: string, icon: string } = null;
  authSubscription: Subscription;

  containerState: string;

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppStateModel>) {
    this.loginMode = true;
    this.containerState = 'login';
  }

  ngOnInit() {
    this.authSubscription = this.store.select('auth').subscribe(authData => {
      this.submitting = authData.isLoading
      authData.error ? this.setMessage(authData.error, 'error') : this.message = null;
    });

    this.reactiveForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });
  }

  onSubmit() {
    if (this.reactiveForm.invalid) return;
    console.log(this.reactiveForm.value);
    // this.submitting = true;

    this.loginMode
      ? this.store.dispatch(new LoginStart(this.reactiveForm.value))
      : this.store.dispatch(new SignupStart(this.reactiveForm.value));

    // let authObsevable: Observable<AuthResponse> = this.loginMode
    //   ? this.authService.login(this.reactiveForm.value)
    //   : this.authService.signUp(this.reactiveForm.value);

    // authObsevable.subscribe({
    //   next: response => this.router.navigate(['/recipes']),
    //   error: error => { this.setMessage(error, 'error'); this.submitting = false; },
    //   complete: () => console.log('completed successfuly')
    // }).add(() => console.log('added after all operation is done'));

    this.reactiveForm.reset();
  }

  switchFormMode() {
    this.loginMode = !this.loginMode;
    this.containerState = this.loginMode ? 'login' : 'signup';
  }

  removeMessage() {
    // this.message = null;
    this.store.dispatch(new RemoverError());
  }

  setMessage(message: any, type: string, messageText?: string) {
    this.message = {
      header: message.name ? message.name : type.toUpperCase(),
      title: message.status + " - " + message.statusText,
      message: messageText ? messageText : message.message ? message.message : type.toUpperCase(),
      type: '',
      icon: ''
    };
    if (type == 'error') {
      this.message.type = 'danger';
      this.message.icon = 'bug';
    }
    else if (type == 'success') {
      this.message.type = 'success';
      this.message.icon = 'check2-circle';
    }
  }

  animationStart(event) {
    console.log(event);

  }

  animationDone(event) {
    console.log(event);

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
