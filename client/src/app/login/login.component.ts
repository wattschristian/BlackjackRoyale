import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loginResult$: Observable<any> | null = null;

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginResult$ = this.auth.login(this.form.value).pipe(
        tap(result => {
          if (result.message === 'Login successful') {
            this.auth.setUser(result.user); // Store user data
            this.router.navigate(['/game']);
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return of({ message: 'Login failed due to server error' });
        })
      );
    }
  }
}
