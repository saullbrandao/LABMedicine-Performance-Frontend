import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../models/patient';
import { API_URL } from '../../utils/constants';
import { Subject } from 'rxjs';
import { Response } from "../../models/response";

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patientSaved = new Subject<Response>();
  patientDeleted = new Subject<Response>();
  editingPatientLodaded = new Subject<Response>();
  httpError = new Subject<Response>();
  patientsLoaded = new Subject<Patient[]>();
  searchedPatients = new Subject<Patient[]>();
  baseUrl = `${API_URL}/pacientes`;

  constructor(private http: HttpClient) {}

  get(id: number) {
    this.http.get(`${this.baseUrl}/${id}`)
      .subscribe(data => {
        this.editingPatientLodaded.next({
          status: 200,
          message: 'Paciente encontrado com sucesso',
          data
        });
      });
  }

  getAll() {
    this.http.get<Patient[]>(`${this.baseUrl}`).subscribe((data) => {
      this.patientsLoaded.next(data);
    });
  }

  getAllByName(name: string) {
    const url = `${this.baseUrl}?name=${name}`;

    this.http.get<Patient[]>(url).subscribe((data) => {
      this.searchedPatients.next(data);
    });
  }

  getById(id: number) {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  save(patient: Patient) {
    if(patient.id) {
      this.http.put(`${this.baseUrl}/${patient.id}`, patient)
        .subscribe(data => {
          this.patientSaved.next({
            status: 202,
            message: "Paciente atualizado com sucesso",
            data
          });
        });
    } else {
      this.http.post(`${this.baseUrl}`, patient)
        .subscribe(data => {
          this.patientSaved.next({
            status: 201,
            message: "Paciente cadastrado com sucesso",
            data
          });
        });
    }
  }

  delete(patientId: number) {
    this.http.delete(`${this.baseUrl}/${patientId}`)
      .subscribe(data => {
        this.patientDeleted.next({
          status: 202,
          message: 'Paciente excluído com sucesso',
          data: undefined
        });
      });
  }
}
