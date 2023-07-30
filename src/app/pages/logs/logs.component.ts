import { Component, OnDestroy, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log';
import { LogService } from '../../services/log.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit, OnDestroy {
  logs: Log[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.logs = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
