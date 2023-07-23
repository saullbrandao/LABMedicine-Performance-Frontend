import { Component } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  patients: Patient[] = [];
  filteredPatients = this.patients;

  constructor(private patientService: PatientService) {
    this.patientService.getAll();
    this.patientService.patientsLoaded.subscribe((data) => {
      this.patients = data;
      this.filteredPatients = data;
    });
  }

  filterPatients(searchTerm: string) {
    this.filteredPatients = this.patients.filter((patient) => {
      const name = patient.name.toLowerCase();
      const term = searchTerm.toLowerCase();

      return (
        name.includes(term) ||
        patient.email.includes(term) ||
        patient.phone.includes(term) ||
        patient.cpf.includes(term)
      );
    });
  }
}
