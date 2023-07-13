import { Component } from '@angular/core';
import { PatientService } from "../../services/patient/patient.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamRegistrationResponse, ExamService } from "../../services/exam/exam.service";
import { NotificationService } from "../../services/notification/notification.service";
import { Patient } from "../../models/patient";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-exam-registration',
  templateUrl: './exam-registration.component.html',
  styleUrls: ['./exam-registration.component.css']
})
export class ExamRegistrationComponent {
  form: FormGroup;
  patientFormFieldOptions: {id: number, name: string}[] = [];
  private componentDestroyed = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private notificationService: NotificationService,
    private patientService: PatientService
  ){
    patientService.patientsLoaded.pipe(takeUntil(this.componentDestroyed)).subscribe(this.setPatientFormFieldOptions);
    examService.examSaved.pipe(takeUntil(this.componentDestroyed)).subscribe(this.toastResponse);
    this.form = this.formBuilder.group(this.formDefaultData);
  }

  get formDefaultData() {
    const now = new Date();

    return {
      id: [ 0 ],
      patientId: [0,
        [ Validators.required, Validators.min(1) ]
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ],
      date: [
        now.toISOString().substring(0,10),
        [ Validators.required ]
      ],
      time: [
        now.toLocaleTimeString().substring(0,5),
        [ Validators.required ]
      ],
      type: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]
      ],
      laboratory: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]
      ],
      url: [ '' ],
      result: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(1024)
        ]
      ],
      status: [ true ]
    }
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }

  get patientFormField(){
    return this.form.get('patientId');
  }

  setPatientId(event: any) {
    this.patientFormField?.setValue(Number(event.target.value));
  }

  toastResponse = (response: ExamRegistrationResponse) => {
    if(response.status !== 201) {
      this.notificationService.error(response.message);
      return;
    }

    this.notificationService.success(response.message);
    this.formReset();
  }

  formReset(){
    this.form = this.formBuilder.group(this.formDefaultData);
  }

  onSubmit() {
    if(!this.form.valid) {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });

      return;
    }

    this.examService.save(this.form.value);
  }

  setPatientFormFieldOptions = (data: Patient[]) => {
    this.patientFormFieldOptions = data.map(patientData => ({
      id: patientData.id,
      name: patientData.fullName
    }));
  }

  ngOnInit(){
    this.patientService.getAll();
  }

  ngOnDestroy(){
    this.componentDestroyed.next('');
  }
}
