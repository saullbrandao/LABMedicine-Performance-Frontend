import { Injectable } from '@angular/core';
import { Exam } from '../models/exam';
import { catchError, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL } from '../utils/constants';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  examSaved = new Subject<Response>();
  examDeleted = new Subject<Response>();
  editingExamLoaded = new Subject<Response>();
  httpError = new Subject<Response>();
  baseUrl = `${API_URL}/exames`;

  constructor(private http: HttpClient) {}

  get(id: number) {
    this.http
      .get(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.editingExamLoaded.next({
          status: 200,
          message: 'Exame encontrado com sucesso',
          data,
        });
      });
  }

  save(exam: Exam) {
    if (exam.id) {
      this.http
        .put(`${this.baseUrl}/${exam.id}`, exam)
        .pipe(catchError(this.handleError))
        .subscribe((data) => {
          this.examSaved.next({
            status: 202,
            message: 'Exame atualizado com sucesso',
            data,
          });
        });
    } else {
      this.http.post<Exam>(`${this.baseUrl}`, exam).subscribe((data) => {
        this.examSaved.next({
          status: 201,
          message: 'Exame cadastrado com sucesso',
          data,
        });
      });
    }
  }

  delete(examId: number) {
    this.http.delete(`${this.baseUrl}/${examId}`).subscribe((data) => {
      this.examDeleted.next({
        status: 202,
        message: 'Exame excluído com sucesso',
        data,
      });
    });
  }

  handleError = (error: HttpErrorResponse) => {
    if (error.status === 404) {
      this.httpError.next({
        status: error.status,
        message: 'Exame não encontrado',
        data: undefined,
      });
    }
    return throwError(() => new Error('Ocorreu algum erro'));
  };
}
