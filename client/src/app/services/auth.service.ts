// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/auth';
  constructor(private http: HttpClient) {}

  login(creds: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, creds);
  }
  register(data: { username: string, email: string, password: string }) {
    return this.http.post(`${this.api}/register`, data);
  }
}
