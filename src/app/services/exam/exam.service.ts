import { Injectable } from "@angular/core";
import { Exam } from "../../models/exam";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../utils/constants";

export type ExamRegistrationResponse = {
  status: number,
  message: string,
  data: Exam
};

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  examSaved = new Subject<ExamRegistrationResponse>();

  constructor(private http: HttpClient) {
  }

  public save(exam: Exam) {
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
