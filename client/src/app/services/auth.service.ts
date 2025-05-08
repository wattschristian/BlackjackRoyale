import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;

  constructor(private http: HttpClient) {
    // Initialize user from localStorage when service is created
    this.user = this.getUserFromLocalStorage();
  }

  login(credentials: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/register', data);
  }

  setUser(user: any) {
    this.user = user;
    // Persist user data to local storage
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (!this.user) {
      this.user = this.getUserFromLocalStorage();
    }
    return this.user;
  }

  updateChips(userId: string, chips: number): Observable<any> {
    return this.http.post('http://localhost:3000/auth/update-chips', { userId, chips });
  }

  private getUserFromLocalStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }

  // Add this method to check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}