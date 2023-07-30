import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      this.authService.login(email, password);
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });
    }
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }

  resetPassword() {
    this.notificationService.info('Funcionalidade em construção!');
  }

  handleRegistration() {
    this.notificationService.info(
      'Contate um administrador para efetuar o seu cadastro.'
    );
  }
}
