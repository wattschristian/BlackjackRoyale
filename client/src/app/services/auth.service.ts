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
    // Load user data from local storage on service initialization
    this.user = this.getUserFromLocalStorage();
  }

  login(credentials: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', credentials);
  }

  setUser(user: any) {
    this.user = user;
    // Persist user data to local storage
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    // Return the in-memory user, which is initialized from local storage
    return this.user;
  }

  updateChips(userId: string, chips: number): Observable<any> {
    return this.http.post('http://localhost:3000/auth/update-chips', { userId, chips });
  }

  private getUserFromLocalStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Optional: Method to clear user data on logout
  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }

}
