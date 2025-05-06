import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

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

  constructor(fb: FormBuilder, private auth: AuthService) {
    this.form = fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginResult$ = this.auth.login(this.form.value);
    }
  }
}
