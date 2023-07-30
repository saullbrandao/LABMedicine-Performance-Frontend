import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from '../utils/constants';
import jwt_decode from 'jwt-decode';

type Token = {
  token: string;
};

type JwtPayload = {
  name: string;
  exp: number;
  iat: number;
  role: string;
  sub: string;
};

type ResetPassword = {
  email: string;
  currentPassword: string;
  newPassword: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly BASE_URL = `${API_URL}/usuarios`;
  userType: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  getUserToken() {
    const token = localStorage.getItem('token');

    if (token) {
      return JSON.parse(token);
    }
  }

  login(email: string, password: string) {
    this.http
      .post<Token>(`${this.BASE_URL}/login`, { email, password })
      .subscribe((res) => {
        localStorage.setItem('token', JSON.stringify(res.token));
        this.router.navigate(['/']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    const localStorageToken = this.getUserToken();
    if (!localStorageToken) {
      return false;
    }

    return localStorageToken !== null && localStorageToken.length > 0;
  }

  resetPassword(resetPassword: ResetPassword) {
    return this.http.put(`${this.BASE_URL}/resetarsenha`, resetPassword);
  }

  decodeToken(token: string) {
    return jwt_decode<JwtPayload>(token);
  }

  getUserName() {
    const token = this.getUserToken();
    return this.decodeToken(token).name;
  }

  getUserType() {
    const token = this.getUserToken();
    return this.decodeToken(token).role;
  }

  isAdmin() {
    const token = this.getUserToken();
    return this.decodeToken(token).role === 'ADMIN';
  }

  isDoctor() {
    const token = this.getUserToken();
    return this.decodeToken(token).role === 'MEDICO';
  }
  isNurse() {
    const token = this.getUserToken();
    return this.decodeToken(token).role === 'ENFERMEIRO';
  }
}
