import { TestBed } from '@angular/core/testing';

import { UserRegistrationService } from './user-registration.service';

// TODO: add tests
describe('UserRegistrationService', () => {
  let service: UserRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
