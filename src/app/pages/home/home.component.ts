import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { StatsService } from 'src/app/services/stats.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  systemStats = {
    pacientes: {
      quantity: 0,
      icon: 'person',
    },
    consultas: {
      quantity: 0,
      icon: 'event_available',
    },
    exames: {
      quantity: 0,
      icon: 'monitor_heart',
    },
    medicamentos: {
      quantity: 0,
      icon: 'medication',
    },
    exercicios: {
      quantity: 0,
      icon: 'fitness_center',
    },
    dietas: {
      quantity: 0,
      icon: 'restaurant_menu',
    },
  };
  patients: Patient[] = [];
  users: User[] = [];
  filteredPatients = this.patients;
  filteredUsers = this.users;

  constructor(
    private patientService: PatientService,
    private userService: UserService,
    private statsService: StatsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.isAdmin()) {
      this.userService.getAll().subscribe((data) => {
        this.users = data;
        this.filteredUsers = data;
      });
    }

    this.patientService.getAll();
    this.patientService.patientsLoaded.subscribe((data) => {
      this.patients = data;
      this.filteredPatients = data;
    });

    this.statsService.getStats().subscribe((data) => {
      this.systemStats.pacientes.quantity = data.patient;
      this.systemStats.consultas.quantity = data.appointment;
      this.systemStats.exames.quantity = data.exam;
      this.systemStats.medicamentos.quantity = data.medication;
      this.systemStats.exercicios.quantity = data.exercise;
      this.systemStats.dietas.quantity = data.diet;
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
      const name = user.name.toLowerCase();
      const term = searchTerm.toLowerCase();

      return (
        name.includes(term) ||
        user.email.includes(term) ||
        user.phone.includes(term) ||
        user.cpf.includes(term)
      );
    });
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  keepOrder = (a: any, b: any) => {
    return a;
  };
}
