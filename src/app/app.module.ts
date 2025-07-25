import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenderValidatorDirective } from './directives/gender-validator.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { AddTokenInterceptor } from './interceptors/add-token.interceptor';
import { PageTitle } from './utils/page-title';
import { TitleStrategy } from '@angular/router';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [AppComponent, GenderValidatorDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' }),
  ],
  providers: [
    { provide: TitleStrategy, useClass: PageTitle },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
