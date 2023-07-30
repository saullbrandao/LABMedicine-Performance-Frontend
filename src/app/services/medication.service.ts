import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL } from '../utils/constants';
import { catchError, Subject, throwError } from 'rxjs';
import { Response } from '../models/response';
import { Medication } from '../models/medication';

@Injectable({ providedIn: 'root' })
export class MedicationService {
  medicationSaved = new Subject<Response>();
  medicationDeleted = new Subject<Response>();
  editingMedicationLoaded = new Subject<Response>();
  httpError = new Subject<Response>();
  baseUrl = `${API_URL}/medicamentos`;

  constructor(private http: HttpClient) {}

  get(id: number) {
    this.http
      .get(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.editingMedicationLoaded.next({
          status: 200,
          message: 'Medicamento encontrado com sucesso',
          data,
        });
      });
  }

  save(medication: Medication) {
    if (medication.id) {
      this.http
        .put(`${this.baseUrl}/${medication.id}`, medication)
        .subscribe((data) => {
          this.medicationSaved.next({
            status: 202,
            message: 'Medicamento atualizado com sucesso',
            data,
          });
        });
    } else {
      this.http
        .post<Medication>(`${this.baseUrl}`, medication)
        .subscribe((data) => {
          this.medicationSaved.next({
            status: 201,
            message: 'Medicamento cadastrado com sucesso',
            data: data,
          });
        });
    }
  }

  delete(medicationId: number) {
    this.http.delete(`${this.baseUrl}/${medicationId}`).subscribe((data) => {
      this.medicationDeleted.next({
        status: 202,
        message: 'Medicamento excluído com sucesso',
        data: undefined,
      });
    });
  }

  handleError = (error: HttpErrorResponse) => {
    if (error.status === 404) {
      this.httpError.next({
        status: error.status,
        message: 'Medicamento não encontrado',
        data: undefined,
      });
    }
    return throwError(() => new Error('Ocorreu algum erro'));
  };
}
