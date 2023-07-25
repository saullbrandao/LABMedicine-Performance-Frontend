import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../utils/constants';
import { MedicalRecord } from '../models/medicalRecord';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService {
  private baseUrl = `${API_URL}/prontuarios`;

  constructor(private http: HttpClient) {}

  getById(patientId: number) {
    return this.http.get<MedicalRecord>(`${this.baseUrl}/${patientId}`);
  }
}
