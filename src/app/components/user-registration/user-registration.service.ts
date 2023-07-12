import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor() {}

  public register(user: User): Observable<any> {
    // TODO: call the real api to register a new user
    const response = { status: 200, message: 'User registered successfully' };
    return of(response);
  }
}
