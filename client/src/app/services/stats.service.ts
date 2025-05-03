// stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private api = '/api/stats';
  constructor(private http: HttpClient) {}
  getStats(): Observable<any> { return this.http.get(this.api); }
}
