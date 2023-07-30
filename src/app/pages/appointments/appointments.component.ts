import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { Appointment } from "../../models/appointment";
import { Subject, takeUntil } from "rxjs";
import { Patient } from "../../models/patient";
import { Response } from "../../models/response";
import { NotificationService } from "../../services/notification/notification.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  @ViewChild('patientInput') patientInput!: ElementRef;

  form: FormGroup;
  private componentDestroyed = new Subject();
  editMode = false;
  disablePatientInput = true;
  header = 'Preencha os campos para cadastrar nova consulta';
  confirmMessage = 'Esta consulta será excluída. Confirma a operação?'

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    [appointmentService.appointmentDeleted, appointmentService.appointmentSaved, appointmentService.httpError].forEach(subject => {
      subject.pipe(takeUntil(this.componentDestroyed)).subscribe(this.toastResponse);
    });
    appointmentService.editingAppointmentLoaded.pipe(takeUntil(this.componentDestroyed)).subscribe(this.loadAppointment)
    this.form = this.formBuilder.group(this.getFormData());
  }

  getFormData(appointment: Appointment | undefined = undefined) {
    const now = new Date();

    if(appointment) {
      this.patientInput.nativeElement.value = appointment.patientName;
    }

    return {
      id: [ appointment?.id || 0 ],
      patientId: [
        appointment?.patientId || 0,
        [ Validators.required, Validators.min(1) ]
      ],
      reason: [ appointment?.reason || '' ,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ],
      date: [
        appointment?.date || now.toISOString().substring(0,10),
        [ Validators.required ]
      ],
      time: [
        appointment?.time || now.toLocaleTimeString().substring(0,5),
        [ Validators.required ]
      ],
      description: [
        appointment?.description || '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(1024)
        ]
      ],
      medication: [ appointment?.medication || null ],
      dosageAndPrecautions: [
        appointment?.dosageAndPrecautions || '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(256)
        ]
      ],
      status: [ appointment ? appointment.status : true ]
    }
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }

  get patientFormField(){
    return this.form.get('patientId');
  }

  setPatient(patient: Patient) {
    this.patientFormField?.setValue(patient.id);
    this.patientInput.nativeElement.value = patient.name;
    this.disablePatientInput = false;
  }

  toastResponse = (response: Response) => {
    if(![200, 201, 202].includes(response.status)) {
      this.notificationService.error(response.message);

      if(response.status === 404) this.goToRegistration();

      return;
    }

    this.notificationService.success(response.message);

    if(response.status === 201) this.formReset();
    if(response.status === 202 && response.message.includes('excluída')) this.goToRegistration();
  }


  goToRegistration(){
    this.router.navigate(['consultas']);
  }

  formReset(){
    this.patientInput.nativeElement.value = '';
    this.form = this.formBuilder.group(this.getFormData());
  }

  onSubmit() {
    if(!this.form.valid) {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });

      return;
    }

    this.appointmentService.save(this.form.value);
  }

  loadAppointment = (response: Response) => {
    const appointment = response.data as Appointment;
    this.form = this.formBuilder.group(this.getFormData(appointment));
  }

  delete() {
    this.appointmentService.delete(this.form.get('id')?.value);
  }

  ngOnInit() {
    this.editMode = !!this.activatedRoute.snapshot.params['id'];
    if(this.editMode) {
      this.header = 'Preencha os campos para editar a consulta';
      this.appointmentService.get(this.activatedRoute.snapshot.params['id']);
    }
  }

  ngOnDestroy(){
    this.componentDestroyed.next('');
  }
}
