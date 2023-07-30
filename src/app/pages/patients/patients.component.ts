import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,ValidationErrors } from "@angular/forms";
import { Patient } from "../../models/patient";
import { ViacepService } from 'src/app/services/viacep/viacep.service';
import { PatientService } from "../../services/patient/patient.service";
import { Gender } from "../../enums/gender";
import { MaritalStatus } from "../../enums/marital-status";
import { Subject, takeUntil } from "rxjs";
import { Response } from "../../models/response";
import { NotificationService } from "../../services/notification/notification.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  form: FormGroup;
  private componentDestroyed = new Subject();
  patientFormFieldOptions: {id: number, name: string}[] = [];
  editMode = false;
  header = 'Preencha os campos para cadastrar um novo paciente';
  confirmMessage = 'Este paciente será excluído. Confirma a operação?'
  genderOptions: (string | Gender)[];
  maritalStatusOptions: (string | MaritalStatus)[];

  constructor(
    private formBuilder: FormBuilder,
    private viaCepService: ViacepService,
    private patientService: PatientService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.form = this.formBuilder.group(this.getFormData());
    [patientService.patientSaved, patientService.patientDeleted, patientService.httpError].forEach(subject => {
      subject.pipe(takeUntil(this.componentDestroyed)).subscribe(this.toastResponse);
    });
    patientService.editingPatientLodaded.pipe(takeUntil(this.componentDestroyed)).subscribe(this.loadPatient);
    this.genderOptions = Object.values(Gender).filter(value => isNaN(Number(value)));
    this.maritalStatusOptions = Object.values(MaritalStatus).filter(value => isNaN(Number(value)));
  }

  getFormData(patient: Patient | undefined = undefined) {
    return {
      id: [ patient?.id || 0 ],
      name: [
        patient?.name || '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ],
      gender: [
        patient?.gender || 'Selecione',
        [ Validators.required, this.genderValidator ]
      ],
      birthDate: [
        patient?.birthDate || '',
        [ Validators.required ]
      ],
      cpf: [
        patient?.cpf || '',
        [ Validators.required ]
      ],
      rg: [
        patient?.rg || '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      maritalStatus:  [
        patient?.maritalStatus  || 'Selecione',
        [ Validators.required, this.maritalStatusValidator ]
      ],
      phone: [
        patient?.phone || '',
        [ Validators.required ]
      ],
      email: [
        patient?.email || '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      naturality: [
        patient?.naturality || '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ],
      emergencyContact: [
        patient?.emergencyContact || '',
        [ Validators.required ]
      ],
      allergyList: [
        patient?.allergyList  || '',
      ],
      specificCareList : [
        patient?.specificCareList || ''
      ],
      healthInsurance : [
        patient?.healthInsurance || ''
      ],
      insuranceNumber : [
        patient?.insuranceNumber  || ''
      ],
      insuranceValidity : [
        patient?.insuranceValidity || null
      ],
      address: this.formBuilder.group({
        cep: [
          patient?.address.cep || '',
          [ Validators.required ]
        ],
        city: [
          patient?.address.city || '',
          [ Validators.required ]
        ],
        state:  [
          patient?.address.state || '',
          [ Validators.required ]
        ],
        street: [
          patient?.address.street || '',
          [ Validators.required ]
        ],
        number: [
          patient?.address.number || '',
          [ Validators.required ]
        ],
        complement: [
          patient?.address.complement || '',

        ],
        neighborhood:  [
          patient?.address.neighborhood || '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        referencePoint:  [
          patient?.address.referencePoint || ''
        ]
      }),
      status:  [
        patient ? patient.status : true
      ]
    }
  }

  loadPatient = (response: Response) => {
    const patient = response.data as Patient;
    this.form = this.formBuilder.group(this.getFormData(patient));
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched
      || this.formGroupAddress.get(input)?.invalid && this.formGroupAddress.get(input)?.touched;
  }

  genderValidator(control: FormControl): ValidationErrors | null {
    if(!control.value.length || control.value === 'Selecione') {
      return { genderInvalid: true };
    }
    return null;
  }

  maritalStatusValidator(control: FormControl): ValidationErrors | null {
    if(!control.value.length || control.value === 'Selecione') {
      return { maritalStatusInvalid: true };
    }
    return null;
  }

  get formGroupAddress() {
    return this.form.get('address') as FormGroup;
  }

  onSubmit() {
    if(!this.form.valid) {
      [this.form, this.formGroupAddress].forEach(group => {
        Object.keys(group.controls).forEach(field => {
          const control = group.get(field);
          control?.markAllAsTouched();
        });
      });

      return;
    }

    this.patientService.save(this.form.value);
  }

  formReset(){
    this.form = this.formBuilder.group(this.getFormData());
  }

  delete(){
    this.patientService.delete(this.form.get('id')?.value);
  }

  dateValidator (control: FormControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Se o campo estiver vazio, a validação será considerada bem-sucedida.
    }

    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!datePattern.test(control.value)) {
      return { invalidDateFormat: true };
    }

    const [day, month, year] = control.value.split('/');
    const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    if (
      dateObject.getFullYear() !== parseInt(year) ||
      dateObject.getMonth() + 1 !== parseInt(month) ||
      dateObject.getDate() !== parseInt(day)
    ) {
      return { invalidDate: true };
    }

    return null; // Data válida, retorno null indicando sucesso na validação.
  };

  goToRegistration(){
    this.router.navigate(['pacientes']);
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

  handleCepBlur(){
    const cep = (this.form.get('address') as FormGroup).get('cep')!.value;
    if(cep.length === 8){
      if(window.confirm('Deseja Consultar o Cep?')){
        this.viaCepService.getAdressbyCep(cep).subscribe(( endereco: any) => {
          (this.form.get('address') as FormGroup).patchValue({
            city: endereco.localidade,
            state: endereco.uf,
            street: endereco.logradouro,
            neighborhood: endereco.bairro
          });
        });
      }
    }
  }

  ngOnInit() {
    this.editMode = !!this.activatedRoute.snapshot.params['id'];
    if(this.editMode) {
      this.header = 'Preencha os campos para editar o paciente';
      this.patientService.get(this.activatedRoute.snapshot.params['id']);
    }
  }

  ngOnDestroy(){
    this.componentDestroyed.next('');
  }
}


