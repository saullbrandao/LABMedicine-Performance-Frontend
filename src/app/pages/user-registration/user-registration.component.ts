import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Gender } from '../../enums/gender';
import { UserType } from '../../enums/user-type';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  form: FormGroup;
  genderOptions: (string | Gender)[] = Object.values(Gender).filter((value) =>
    isNaN(Number(value))
  );
  userTypeOptions: (string | UserType)[] = Object.values(UserType).filter(
    (value) => isNaN(Number(value))
  );

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.form = this.formBuilder.group(this.getFormData());
  }

  getFormData() {
    return {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      gender: ['Selecione', [Validators.required, this.genderValidator]],
      cpf: ['', [Validators.required, Validators.maxLength(11)]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['Selecione', [Validators.required, this.userTypeValidator]],
    };
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }

  genderValidator(control: FormControl): ValidationErrors | null {
    if (!control.value.length || control.value === 'Selecione') {
      return { genderInvalid: true };
    }
    return null;
  }

  userTypeValidator(control: FormControl): ValidationErrors | null {
    if (!control.value.length || control.value === 'Selecione') {
      return { typeInvalid: true };
    }
    return null;
  }

  resetForm() {
    this.form = this.formBuilder.group(this.getFormData());
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.create(this.form.value).subscribe((res) => {
        this.notificationService.success('Usuário cadastrado com sucesso');
        this.resetForm();
      });
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });
    }
  }
}
