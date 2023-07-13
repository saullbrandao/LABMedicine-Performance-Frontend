import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Patient } from "../../models/patient";
import { API_URL } from "../../utils/constants";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientsLoaded = new Subject<Patient[]>();

  constructor(private http: HttpClient) {
  }

  getAll(){
    this.http.get<Patient[]>(`${API_URL}/patients`)
      .subscribe(data => {
        this.patientsLoaded.next(data);
      });
  }
}
