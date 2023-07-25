import { Appointment } from './appointment';
import { Diet } from './diet';
import { Exam } from './exam';
import { Exercise } from './exercise';
import { Medication } from './medication';

export type MedicalRecord = {
  patient: {
    id: number;
    name: string;
    emergencyContact: string;
    healthInsurance: string;
    allergyList: string;
    specificCareList: string;
  };
  appointments: Appointment[];
  exams: Exam[];
  medications: Medication[];
  diets: Diet[];
  exercises: Exercise[];
};
