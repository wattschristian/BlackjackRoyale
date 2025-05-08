import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient, private auth: AuthService) {}

  startGame(bet: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/start`, {bet});
  }

  hit(): Observable<any> {
    const user = this.auth.getUser();
    const userId = user ? user.id : null;
    return this.http.post<any>(`${this.baseUrl}/hit`, { userId });
  }

  stand(): Observable<any> {
    const user = this.auth.getUser();
    const userId = user ? user.id : null;
    return this.http.post<any>(`${this.baseUrl}/stand`, { userId });
  }
}
