import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';

type UserRegistrationResponse = {
  status: number;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor() {}

  public register(user: User): Observable<UserRegistrationResponse> {
    // TODO: call the real api to register a new user
    const response = {
      status: 201,
      message: 'Usuário registrado com sucesso',
    };
    return of(response);
  }
}
