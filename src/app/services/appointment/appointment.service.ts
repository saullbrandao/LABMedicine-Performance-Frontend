import { Injectable } from "@angular/core";
import { Appointment } from "../../models/appointment";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Response } from "../../models/response";
import { API_URL } from "../../utils/constants";

@Injectable({providedIn: 'root'})
export class AppointmentService {
  appointmentSaved = new Subject<Response>();
  appointmentDeleted = new Subject<Response>();
  editingAppointmentLoaded = new Subject<Response>();
  httpError = new Subject<Response>();
  baseUrl = `${API_URL}/consultas`;

  constructor(private http: HttpClient ) {
  }

  get(id: number) {
    this.http.get(`${this.baseUrl}/${id}`)
      .subscribe(data => {
        this.editingAppointmentLoaded.next({
          status: 200,
          message: 'Consulta encontrada com sucesso',
          data
        });
      });
  }

  save(appointment: Appointment) {
    if(appointment.id) {
      this.http.put(`${this.baseUrl}/${appointment.id}`, appointment)
        .subscribe(data => {
          this.appointmentSaved.next({
            status: 202,
            message: 'Consulta atualizada com sucesso',
            data
          });
        });
    } else {
      this.http.post(`${this.baseUrl}`, appointment)
        .subscribe(data => {
          this.appointmentSaved.next({
            status: 201,
            message: 'Consulta cadastrada com sucesso',
            data
          });
        });
    }
  }

  delete(appointmentId: number) {
    this.http.delete(`${this.baseUrl}/${appointmentId}`)
      .subscribe(data => {
        this.appointmentDeleted.next({
          status: 202,
          message: 'Consulta excluída com sucesso',
          data
        });
      });
  }
}
