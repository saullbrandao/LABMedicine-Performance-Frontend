import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CPF_REGEX, PHONE_REGEX } from 'src/app/utils/constants';
import { UserRegistrationService } from './user-registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService
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
      this.userRegistrationService.register(this.form.value).subscribe({
        next(res) {
          // TODO: maybe add a toast notification instead of this alert
          alert('Usuário cadastrado');
        },
        error(err) {
          // TODO: handle the error according to HTTP status received(400, 409, 500)
          alert('Erro ao cadastrar usuário');
        },
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
