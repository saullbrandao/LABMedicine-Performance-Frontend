import { MedicationType } from '../enums/medication-type';

export type Medication = {
  id: number;
  patientId: number;
  name: string;
  date: string;
  time: string;
  type: MedicationType;
  quantity: string;
  unit: string;
  observations: string;
  status: boolean;
};
