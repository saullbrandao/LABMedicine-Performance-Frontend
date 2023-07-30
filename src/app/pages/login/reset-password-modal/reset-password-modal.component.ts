import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.css'],
})
export class ResetPasswordModalComponent {
  form: FormGroup;
  @ViewChild('closeModal') closeModal!: ElementRef<HTMLButtonElement>;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const currentPassword = this.form.get('currentPassword')?.value;
      const newPassword = this.form.get('newPassword')?.value;

      this.authService
        .resetPassword({ email, currentPassword, newPassword })
        .subscribe((res) => {
          this.closeModal.nativeElement.click();
          setTimeout(
            () =>
              this.notificationService.success('Senha alterada com sucesso'),
            1000
          );
        });
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
}
