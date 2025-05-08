// stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getStats(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats?userId=${userId}`);
  }
}

