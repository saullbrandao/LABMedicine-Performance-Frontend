import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CPF_REGEX, PHONE_REGEX } from 'src/app/utils/constants';
import { UserRegistrationService } from './user-registration.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private notificationService: NotificationService
  ) {
    this.form = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      gender: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(CPF_REGEX)]],
      phone: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['', [Validators.required]],
    });
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }

  onSubmit() {
    if (this.form.valid) {
      this.userRegistrationService
        .register(this.form.value)
        .subscribe((res) => {
          this.notificationService.success(res.message);

          switch (res.status) {
            case 201:
              this.notificationService.success(res.message);
              break;
            default:
              this.notificationService.error(res.message);
          }
        });

      this.form.reset();
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });
    }
  }
}
