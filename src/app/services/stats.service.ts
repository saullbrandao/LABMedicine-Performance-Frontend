import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stats } from '../models/stats';
import { API_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private baseUrl = `${API_URL}/estatisticas`;

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<Stats>(this.baseUrl);
  }
}
