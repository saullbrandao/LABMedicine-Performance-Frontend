import {Component, ElementRef, ViewChild} from '@angular/core';
import { PatientService } from "../../services/patient/patient.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamService } from "../../services/exam/exam.service";
import { NotificationService } from "../../services/notification/notification.service";
import { Patient } from "../../models/patient";
import { Subject, takeUntil } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Exam } from "../../models/exam";
import { Response } from "../../models/response";

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent {
  @ViewChild('patientInput') patientInput!: ElementRef;

  form: FormGroup;
  patientFormFieldOptions: {id: number, name: string}[] = [];
  private componentDestroyed = new Subject();
  editMode = false;
  disablePatientInput = true;
  header = 'Preencha os campos para cadastrar novo exame';
  confirmMessage = 'Este exame será excluído. Confirma a operação?'

  constructor(
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private notificationService: NotificationService,
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    examService.examSaved.pipe(takeUntil(this.componentDestroyed)).subscribe(this.toastResponse);
    examService.examDeleted.pipe(takeUntil(this.componentDestroyed)).subscribe(this.toastResponse);
    examService.editingExamLoaded.pipe(takeUntil(this.componentDestroyed)).subscribe(this.loadExam);
    examService.httpError.pipe(takeUntil(this.componentDestroyed)).subscribe(this.toastResponse);
    this.form = this.formBuilder.group(this.getFormData());
  }

  getFormData(exam: Exam | undefined = undefined) {
    const now = new Date();

    if(exam) {
      this.patientInput.nativeElement.value = exam.patientName;
    }

    return {
      id: [ exam?.id || 0 ],
      patientId: [ exam?.patientId || 0,
        [ Validators.required, Validators.min(1) ]
      ],
      name: [
        exam?.name || '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ],
      date: [
        exam?.date || now.toISOString().substring(0,10),
        [ Validators.required ]
      ],
      time: [
        exam?.time || now.toLocaleTimeString().substring(0,5),
        [ Validators.required ]
      ],
      type: [
        exam?.type || '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]
      ],
      laboratory: [
        exam?.laboratory || '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]
      ],
       url: [ exam?.url || '' ],
      results: [
        exam?.results || '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(1024)
        ]
      ],
      status: [ exam ? exam.status : true ]
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
    if(response.status === 202 && response.message.includes('excluído')) this.goToRegistration();
  }

  goToRegistration(){
    this.router.navigate(['exames']);
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

    this.examService.save(this.form.value);
  }

  loadExam = (response: Response) => {
    const exam = response.data as Exam;
    this.form = this.formBuilder.group(this.getFormData(exam));
  }

  delete(){
    this.examService.delete(this.form.get('id')?.value);
  }

  ngOnInit(){
    this.patientService.getAll();

    this.editMode = !!this.activatedRoute.snapshot.params['id'];
    if(this.editMode){
      this.header = 'Preencha os campos para editar o exame';
      this.examService.get(this.activatedRoute.snapshot.params["id"])
    }
  }

  ngOnDestroy(){
    this.componentDestroyed.next('');
  }
}
