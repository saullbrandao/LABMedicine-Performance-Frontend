export type Appointment = {
  id: number;
  patientId: number;
  reason: string;
  date: string;
  time: string;
  description: string;
  medication: string;
  dosageAndPrecautions: string;
  status: boolean;
};
