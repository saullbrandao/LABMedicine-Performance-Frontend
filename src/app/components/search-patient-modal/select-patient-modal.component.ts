import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-search-patient-modal',
  templateUrl: './select-patient-modal.component.html',
  styleUrls: ['./select-patient-modal.component.css'],
})
export class SelectPatientModalComponent {
  @ViewChild('searchPatientInput') searchPatientInput!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('modalCloseBtn') modalCloseBtn!: ElementRef;

  @Output() patientSelected = new EventEmitter();

  private componentDestroyed = new Subject();

  patients: Patient[] = [];

  constructor(private patientService: PatientService) {
    patientService.searchedPatients.subscribe((data) => (this.patients = data));
  }

  searchPatient = (value: string) => {
    this.patientService.getAllByName(value);
  };

  select(patient: Patient) {
    this.patientSelected.emit(patient);
    this.closeModal();
  }

  closeModal() {
    this.modalCloseBtn.nativeElement.click();
  }

  resetState = () => {
    this.searchPatientInput.nativeElement.value = '';
    this.patients = [];
  };

  ngAfterViewInit() {
    const input = this.searchPatientInput.nativeElement;
    const modal = this.modal.nativeElement;

    fromEvent(input, 'keyup')
      .pipe(debounceTime(600), takeUntil(this.componentDestroyed))
      .subscribe((e: any) => {
        const value = e.target.value;

        if (!value.length) {
          this.patients = [];
          return;
        }

        this.searchPatient(e.target.value);
      });

    fromEvent(modal, 'hidden.bs.modal').subscribe(this.resetState);
  }

  ngOnDestroy() {
    this.componentDestroyed.next('');
  }
}
