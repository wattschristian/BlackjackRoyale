// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  constructor(fb: FormBuilder, private auth: AuthService) {
    this.form = fb.group({
      email: [''], password: ['']
    });
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     this.auth.login(this.form.value)
  //       .subscribe(() => /* navigate to /game */);
  //   }
  // }
}
