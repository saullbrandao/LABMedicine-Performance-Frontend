import { Injectable } from '@angular/core';
import { API_URL } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = `${API_URL}/usuarios`;

  constructor(private http: HttpClient) {}

  create(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  getAll() {
    return this.http.get<User[]>(this.baseUrl);
  }
}
