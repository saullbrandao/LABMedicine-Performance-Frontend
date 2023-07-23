import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { User } from 'src/app/models/user';
import { PatientService } from 'src/app/services/patient/patient.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  systemStats = {
    pacientes: {
      quantity: 0,
      icon: 'person-circle',
    },
    consultas: {
      quantity: 0,
      icon: 'postcard-heart',
    },
    exames: {
      quantity: 0,
      icon: 'clipboard-pulse',
    },
    medicamentos: {
      quantity: 0,
      icon: 'capsule',
    },
    exercicios: {
      quantity: 0,
      icon: 'lungs',
    },
    dietas: {
      quantity: 0,
      icon: 'journal-text',
    },
  };
  patients: Patient[] = [];
  users: User[] = [];
  filteredPatients = this.patients;
  filteredUsers = this.users;

  constructor(
    private patientService: PatientService,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    this.patientService.getAll();
    this.patientService.patientsLoaded.subscribe((data) => {
      this.patients = data;
      this.filteredPatients = data;
    });

    this.statsService.getStats().subscribe((data) => {
      this.systemStats.pacientes.quantity = data.patients;
      this.systemStats.consultas.quantity = data.appointments;
      this.systemStats.exames.quantity = data.exams;
      this.systemStats.medicamentos.quantity = data.medications;
      this.systemStats.exercicios.quantity = data.exercises;
      this.systemStats.dietas.quantity = data.diets;
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

  filterUsers(searchTerm: string) {
    this.filteredUsers = this.users.filter((user) => {
      const name = user.fullName.toLowerCase();
      const term = searchTerm.toLowerCase();

      return (
        name.includes(term) ||
        user.email.includes(term) ||
        user.phone.includes(term) ||
        user.cpf.includes(term)
      );
    });
  }

  keepOrder = (a: any, b: any) => {
    return a;
  };
}
