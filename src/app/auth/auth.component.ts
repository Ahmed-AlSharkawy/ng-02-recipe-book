import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from '../shared/authentication/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  temp = ''
  states: string[];
  reactiveForm: FormGroup;
  loginMode: boolean;
  submitting: boolean = false;
  message: { header: string, title: string, message: string, type: string, icon: string } = null;

  constructor(private authService: AuthService, private router: Router) {
    this.loginMode = false;
  }

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });
  }

  onSubmit() {
    if (this.reactiveForm.invalid) return;
    console.log(this.reactiveForm.value);
    this.submitting = true;

    let authObsevable: Observable<AuthResponse> = this.loginMode
      ? this.authService.login(this.reactiveForm.value)
      : this.authService.signUp(this.reactiveForm.value);

    authObsevable.subscribe({
      next: response => this.router.navigate(['/recipes']),
      error: error => this.setMessage(error, 'error'),
      complete: () => console.log('completed successfuly')
    }).add(() => this.submitting = false);

    this.reactiveForm.reset();
  }

  switchFormMode() {
    this.loginMode = !this.loginMode;
  }


  removeMessage() {
    this.message = null;
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
}
