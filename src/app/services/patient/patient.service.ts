import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Patient } from "../../models/patient";
import { API_URL } from "../../utils/constants";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientsLoaded = new Subject<Patient[]>();
  searchedPatients = new Subject<Patient[]>();
  baseUrl = `${API_URL}/patients`;

  constructor(private http: HttpClient) {
  }

  getAll(){
    this.http.get<Patient[]>(`${this.baseUrl}`)
      .subscribe(data => {
        this.patientsLoaded.next(data);
      });
  }

  getAllByName(name: string) {
    const url = `${API_URL}/patients?fullName_like=${name}`;

    this.http.get<Patient[]>(url)
      .subscribe(data => {
        this.searchedPatients.next(data);
      });
  }
}
