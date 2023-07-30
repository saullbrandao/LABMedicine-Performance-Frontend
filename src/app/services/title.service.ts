import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private title: Subject<string> = new Subject();

  setPageTitle(title: string) {
    this.title.next(title);
  }

  getPageTitle() {
    return this.title;
  }
}
