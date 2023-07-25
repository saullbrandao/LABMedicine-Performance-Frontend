import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MedicalRecord } from 'src/app/models/medicalRecord';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css'],
})
export class MedicalRecordComponent implements OnDestroy {
  medicalRecord: MedicalRecord = {} as MedicalRecord;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private medicalRecordService: MedicalRecordService,
    private route: ActivatedRoute
  ) {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      const id = params['id'];

      this.medicalRecordService
        .getById(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.medicalRecord = data;
        });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
