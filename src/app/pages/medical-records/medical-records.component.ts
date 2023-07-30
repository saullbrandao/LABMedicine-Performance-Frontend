import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MedicalRecord } from 'src/app/models/medicalRecord';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css'],
})
export class MedicalRecordsComponent implements OnInit, OnDestroy {
  medicalRecords: MedicalRecord[] = [];
  filteredMedicalRecords: MedicalRecord[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private medicalRecordService: MedicalRecordService) {}

  ngOnInit(): void {
    this.medicalRecordService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.medicalRecords = data;
        this.filteredMedicalRecords = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filterMedicalRecords(searchTerm: string) {
    this.filteredMedicalRecords = this.medicalRecords.filter(
      (medicalRecord) => {
        const name = medicalRecord.patient.name.toLowerCase();
        const term = searchTerm.toLowerCase();

        return (
          name.includes(term) ||
          medicalRecord.patient.id?.toString().includes(term)
        );
      }
    );
  }
}
