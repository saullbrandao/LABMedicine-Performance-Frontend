import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { API_URL } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  baseURL = `${API_URL}/exercicios`;
  constructor(private http: HttpClient) {}

  private create(exercise: Exercise) {
    return this.http.post<Exercise>(this.baseURL, exercise);
  }

  private update(exercise: Exercise) {
    return this.http.put<Exercise>(`${this.baseURL}/${exercise.id}`, exercise);
  }

  save(exercise: Exercise) {
    if (exercise.id) return this.update(exercise);

    return this.create(exercise);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getById(id: number) {
    return this.http.get<Exercise>(`${this.baseURL}/${id}`);
  }
}
