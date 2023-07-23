import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { Diet } from "../../models/diet";
import { Patient } from "../../models/patient";
import { DietService } from "../../services/diet/diet.service";
import { NotificationService } from "../../services/notification/notification.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Response } from "../../models/response";

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
})
export class DietsComponent {
  @ViewChild('patientInput') patientInput!: ElementRef;

  form: FormGroup;
  private componentDestroyed = new Subject();
  editMode = false;
  header = 'Preencha os campos para cadastrar nova dieta';
  confirmMessage = 'Esta dieta será excluída. Confirma a operação?'
  typeOptions: {label: string, code: string}[] = [
    { label: "Low Carb", code: "LOWCARB" },
    { label: "Dash", code: "DASH" },
    { label: "Paleolítica", code: "PALEOLITICA" },
    { label: "Cetogênica", code: "CETOGENICA" },
    { label: "Dukan", code: "DUKAN"},
    { label: "Mediterrânea", code: "MEDITERRANEA" },
    { label: "Outra", code: "OUTRA" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dietService: DietService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {
    this.form = formBuilder.group(this.getFormData());
    [dietService.dietSaved, dietService.dietDeleted, dietService.httpError].forEach(subject => {
      subject.pipe(takeUntil(this.componentDestroyed)).subscribe(this.toastResponse);
    });
    dietService.editingDietLodaded.pipe(takeUntil(this.componentDestroyed)).subscribe(this.loadDiet);
  }

  getFormData(diet: Diet | undefined = undefined) {
    const now = new Date();

    if(diet) {
      this.patientInput.nativeElement.value = diet.patientName;
    }

    return {
      id: [ diet?.id || 0 ],
      patientId: [
        diet?.patientId || 0,
        [ Validators.required, Validators.min(1) ]
      ],
      name: [
        diet?.name || '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      ],
      date: [
        diet?.date || now.toISOString().substring(0,10),
        [ Validators.required ]
      ],
      time: [
        diet?.time || now.toLocaleTimeString().substring(0,5),
        [ Validators.required ]
      ],
      type: [
        diet?.type || '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]
      ],
      description: [
        diet?.description || '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000)
        ]
      ],
      status: [ diet ? diet.status : true ]
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
    this.router.navigate(['diets']);
  }

  formReset(){
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

    this.dietService.save(this.form.value);
  }

  loadDiet = (response: Response) => {
    const diet = response.data as Diet;
    this.form = this.formBuilder.group(this.getFormData(diet));
  }

  delete(){
    this.dietService.delete(this.form.get('id')?.value);
  }

  ngOnInit() {
    this.editMode = !!this.activatedRoute.snapshot.params['id'];
    if(this.editMode) {
      this.header = 'Preencha os campos para editar a dieta'
      this.dietService.get(this.activatedRoute.snapshot.params['id'])
    }
  }

  ngOnDestroy(){
    this.componentDestroyed.next('');
  }
}
