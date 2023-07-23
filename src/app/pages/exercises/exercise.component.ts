import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from './exercise.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ExerciseType } from '../../enums/exercise-type';
import { Exercise } from 'src/app/models/exercise';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Subject, takeUntil } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { DateTimeService } from 'src/app/services/date-time.service';

// TODO: redirect the user to the appropriate page after the operation is done
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit, OnDestroy {
  @ViewChild('patientInput') patientInput!: ElementRef<HTMLInputElement>;

  form: FormGroup;
  exerciseType = ExerciseType;
  patientSelectedId: number | null = null;
  isEditing: boolean = false;
  disablePatientInput = true;
  confirmMessage = 'Este exercício será excluído. Confirma a operação?';

  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private exerciseService: ExerciseService,
    private notificationService: NotificationService,
    private dateTimeService: DateTimeService
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      patientId: [null, [Validators.required]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      date: [dateTimeService.getFormattedDate(), [Validators.required]],
      time: [dateTimeService.getFormattedTime(), [Validators.required]],
      type: [this.exerciseType.AGILIDADE, [Validators.required]],
      amountPerWeek: [
        1,
        [Validators.required, Validators.min(1), Validators.max(7)],
      ],
      description: ['', [Validators.required]],
      status: [true, []],
    });
  }

  ngOnInit(): void {
    const exercise: Exercise = this.route.snapshot.data['exercise'];

    if (exercise?.patientId) {
      this.isEditing = true;

      this.patientService
        .getById(exercise.patientId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((patient) => {
          this.setPatient(patient);
        });
      this.form.patchValue({
        ...exercise,
        date: this.dateTimeService.getFormattedDate(exercise.date),
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setPatient(patient: Patient) {
    this.form.patchValue({
      patientId: patient.id,
    });
    this.patientInput.nativeElement.value = patient.name;
    this.disablePatientInput = false;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markFormControlsAsTouched();
      return;
    }

    const exercise = this.form.value;
    exercise.date = this.dateTimeService.convertDateStringToISOFormat(
      exercise.date
    );

    const successMsg = exercise.id
      ? 'Exercício atualizado com sucesso!'
      : 'Exercício cadastrado com sucesso!';

    this.exerciseService
      .save(exercise)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.notificationService.success(successMsg);
      });
  }

  onDelete() {
    const id = this.form.get('id')?.value;
    this.exerciseService.delete(id).subscribe(() => {
      this.notificationService.success('Exercício deletado com sucesso!');
    });
  }

  getExerciseTypes(): (string | ExerciseType)[] {
    return Object.values(ExerciseType).filter((value) => isNaN(Number(value)));
  }

  isInvalid(input: string) {
    const formControl = this.form.get(input);
    return formControl?.invalid && formControl?.touched;
  }

  private markFormControlsAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
