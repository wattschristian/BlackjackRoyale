// game.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  private api = '/api/game';
  constructor(private http: HttpClient) {}
  deal(): Observable<any>         { return this.http.get(`${this.api}/deal`); }
  hit(): Observable<any>          { return this.http.post(`${this.api}/hit`, {}); }
  stand(): Observable<any>        { return this.http.post(`${this.api}/stand`, {}); }
}
