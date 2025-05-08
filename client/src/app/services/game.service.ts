// // game.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import type { Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class GameService {
//   private api = '/api/game';
//   constructor(private http: HttpClient) {}
//   deal(): Observable<any>         { return this.http.get(`${this.api}/deal`); }
//   hit(): Observable<any>          { return this.http.post(`${this.api}/hit`, {}); }
//   stand(): Observable<any>        { return this.http.post(`${this.api}/stand`, {}); }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:3000'; // adjust the port if needed

  constructor(private http: HttpClient) {}

  startGame(bet: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/start`, {bet});
  }

  hit(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/hit`, {});
  }

  stand(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/stand`, {});
  }
}
