import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL } from '../utils/constants';
import { Diet } from '../models/diet';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  dietSaved = new Subject<Response>();
  dietDeleted = new Subject<Response>();
  editingDietLodaded = new Subject<Response>();
  httpError = new Subject<Response>();
  baseUrl = `${API_URL}/dietas`;

  constructor(private http: HttpClient) {}

  get(id: number) {
    this.http
      .get(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.editingDietLodaded.next({
          status: 200,
          message: 'Dieta encontrada com sucesso',
          data,
        });
      });
  }

  save(diet: Diet) {
    if (diet.id) {
      this.http.put(`${this.baseUrl}/${diet.id}`, diet).subscribe((data) => {
        this.dietSaved.next({
          status: 202,
          message: 'Dieta atualizada com sucesso',
          data,
        });
      });
    } else {
      this.http.post<Diet>(`${this.baseUrl}`, diet).subscribe((data) => {
        this.dietSaved.next({
          status: 201,
          message: 'Dieta cadastrada com sucesso',
          data: data,
        });
      });
    }
  }

  delete(dietId: number) {
    this.http.delete(`${this.baseUrl}/${dietId}`).subscribe((data) => {
      this.dietDeleted.next({
        status: 202,
        message: 'Dieta excluída com sucesso',
        data: undefined,
      });
    });
  }

  handleError = (error: HttpErrorResponse) => {
    if (error.status === 404) {
      this.httpError.next({
        status: error.status,
        message: 'Dieta não encontrada',
        data: undefined,
      });
    }
    return throwError(() => new Error('Ocorreu algum erro'));
  };
}
