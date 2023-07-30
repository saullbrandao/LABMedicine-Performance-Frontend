import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from '../../services/exercise.service';
import { ExerciseType } from 'src/app/enums/exercise-type';

@Injectable({
  providedIn: 'root',
})
export class ExerciseResolver implements Resolve<Exercise> {
  constructor(private exerciseService: ExerciseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Exercise> {
    if (route.params && route.params['id']) {
      return this.exerciseService.getById(route.params['id']);
    }

    return of({
      id: undefined,
      patientId: undefined,
      name: '',
      date: '',
      time: '',
      type: ExerciseType.AGILIDADE,
      amountPerWeek: 1,
      description: '',
      status: true,
    });
  }
}
