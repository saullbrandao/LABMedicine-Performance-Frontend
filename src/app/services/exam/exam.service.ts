import { Injectable } from "@angular/core";
import { Exam } from "../../models/exam";
import { catchError, Subject, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { API_URL } from "../../utils/constants";

export type ExamRegistrationResponse = {
  status: number,
  message: string,
  data: any
};

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  examSaved = new Subject<ExamRegistrationResponse>();
  examDeleted = new Subject<ExamRegistrationResponse>();
  editingExamLoaded = new Subject<ExamRegistrationResponse>();
  httpError = new Subject<ExamRegistrationResponse>();

  constructor(private http: HttpClient) {
  }

  get(id: number) {
    this.http.get(`${API_URL}/exams/${id}`)
      .pipe(catchError(this.handleError))
      .subscribe(data => {
        // TODO: call real api and use its response (currently using json server)
        const response = {
          status: 200,
          message: 'Exame encontrado com sucesso',
          data
        }
        this.editingExamLoaded.next(response);
      });
  }

  save(exam: Exam) {
    if(exam.id) {
      this.http.put(`${API_URL}/exams/${exam.id}`, exam)
        .subscribe(data => {
          // TODO: call real api and use its response (currently using json server)
          const response = {
            status: 200,
            message: 'Exame atualizado com sucesso',
            data
          }
          this.examSaved.next(response);
        });
    } else {
      this.http.post<Exam>(`${API_URL}/exams`, exam)
        .subscribe(data => {
          // TODO: call real api and use its response (currently using json server)
          const response = {
            status: 201,
            message: 'Exame cadastrado com sucesso',
            data
          }
          this.examSaved.next(response);
        });
    }
  }

  delete(examId: number) {
    this.http.delete(`${API_URL}/exams/${examId}`)
      .subscribe(data => {
        // TODO: call real api and use its response (currently using json server)
        const response = {
          status: 204,
          message: 'Exame excluído com sucesso',
          data
        }
        this.examDeleted.next(response);
      });
  }

  handleError = (error: HttpErrorResponse) => {
    if(error.status === 404) {
      this.httpError.next({
        status: error.status,
        message: 'Exame não encontrado',
        data: undefined
      });
    }
    return throwError(() => new Error('Ocorreu algum erro'));
  }
}
