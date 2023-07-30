import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Medication} from "../../models/medication";
import {Patient} from "../../models/patient";
import {MedicationType} from "../../enums/medication-type";
import {MedicationService} from "../../services/medication/medication.service";
import {Response} from "../../models/response";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {NotificationService} from "../../services/notification/notification.service";
import {MedicationUnit} from "../../enums/medication-unit";

@Component({
  selector: 'app-medication',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent {
  @ViewChild('patientInput') patientInput!: ElementRef;

  form: FormGroup;
  private componentDestroyed = new Subject();
  editMode = false;
  disablePatientInput = true;
  header = 'Preencha os campos para cadastrar novo medicamento';
  confirmMessage = 'Este medicamento será excluído. Confirma a operação?'
  typeOptions: (string | MedicationType)[];
  unitOptions: (MedicationUnit)[];

  constructor(private formBuilder: FormBuilder, private medicationService: MedicationService, private activatedRoute: ActivatedRoute, private router: Router, private notificationService: NotificationService) {
    this.form = formBuilder.group(this.getFormData());
    [medicationService.medicationSaved, medicationService.medicationDeleted, medicationService.httpError].forEach(subject => {
      subject.pipe(takeUntil(this.componentDestroyed)).subscribe(this.toastResponse);
    })
    medicationService.editingMedicationLoaded.pipe(takeUntil(this.componentDestroyed)).subscribe(this.loadMedication);
    this.typeOptions = Object.values(MedicationType).filter(value => isNaN(Number(value)));
    this.unitOptions = Object.values(MedicationUnit).filter(value => isNaN(Number(value))).map(x => x as MedicationUnit);
  }

  getFormData(medication: Medication | undefined = undefined) {
    const now = new Date();

    if(medication) {
      this.patientInput.nativeElement.value = medication.patientName;
    }

    return {
      id: [ medication?.id || 0 ],
      patientId: [
        medication?.patientId || 0,
        [ Validators.required, Validators.min(1) ]
      ],
      name: [
        medication?.name || '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      ],
      date: [
        medication?.date || now.toISOString().substring(0, 10),
        [ Validators.required ]
      ],
      time: [
        medication?.time || now.toLocaleTimeString().substring(0, 5),
        [ Validators.required ]
      ],
      type: [
        medication?.type || '',
        [ Validators.required ]
      ],
      quantity: [
        medication?.quantity || null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],
      unit: [
        medication?.unit || '',
        [ Validators.required ]
      ],
      observations: [
        medication?.observations || '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000)
        ]
      ],
      status: [ medication ? medication.status : true ]
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

  getUnit(value: MedicationUnit) {
    return value.toString() === 'porcento'
      ? '%' : value;
  }

  toastResponse = (response: Response) => {
    if(![200, 201, 202].includes(response.status)) {
      this.notificationService.error(response.message);

      if(response.status === 404) this.goToRegistration();

      return;
    }

    this.notificationService.success(response.message);

    if(response.status === 201) this.formReset();
    if(response.status === 202 && response.message.includes('excluído')) this.goToRegistration();
  }

  goToRegistration(){
    this.router.navigate(['medicamentos']);
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

    this.medicationService.save(this.form.value);
  }

  loadMedication = (response: Response) => {
    const medication = response.data as Medication;
    this.form = this.formBuilder.group(this.getFormData(medication));
  }

  delete(){
    this.medicationService.delete(this.form.get('id')?.value);
  }

  ngOnInit() {
    this.editMode = !!this.activatedRoute.snapshot.params['id'];
    if(this.editMode) {
      this.header = 'Preencha os campos para editar o medicamento'
      this.medicationService.get(this.activatedRoute.snapshot.params['id']);
    }
  }

  ngOnDestroy(){
    this.componentDestroyed.next('');
  }
}
