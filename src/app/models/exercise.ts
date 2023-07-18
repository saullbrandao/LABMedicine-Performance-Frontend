import { ExerciseType } from '../enums/exercise-type';

export type Exercise = {
  id?: number;
  patientId?: number;
  name: string;
  date: string;
  time: string;
  type: ExerciseType;
  amountPerWeek: number;
  description: string;
  status: boolean;
};
