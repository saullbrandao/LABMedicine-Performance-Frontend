import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TitleService } from '../services/title.service';

@Injectable({ providedIn: 'root' })
export class PageTitle extends TitleStrategy {
  constructor(
    private readonly title: Title,
    private titleService: TitleService
  ) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    let customTitle = 'LABMedicine';

    if (title !== undefined) {
      this.titleService.setPageTitle(title);
      customTitle += ` | ${title}`;
    }

    this.title.setTitle(customTitle);
  }
}
