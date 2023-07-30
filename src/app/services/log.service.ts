import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from 'src/app/models/log';
import { API_URL } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private readonly baseUrl = `${API_URL}/logs`;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Log[]>(this.baseUrl);
  }
}
