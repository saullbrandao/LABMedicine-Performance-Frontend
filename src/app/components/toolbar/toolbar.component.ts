import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements AfterViewInit {
  title: string = '';
  username: string | undefined = '';
  private destroy$ = new Subject<void>();
  private titleSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private titleService: TitleService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.titleSubscription = this.titleService
      .getPageTitle()
      .pipe(takeUntil(this.destroy$))
      .subscribe((title: string) => {
        this.title = title;
        this.changeDetectorRef.detectChanges();
      });

    this.getUserName();
  }

  shouldDisplay() {
    return !this.router.isActive('/login', {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  getUserName() {
    this.username = this.authService.getUserName();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
  }
}
