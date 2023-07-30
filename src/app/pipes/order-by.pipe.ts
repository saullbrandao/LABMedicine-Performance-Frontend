import { Pipe, PipeTransform } from '@angular/core';

interface DateTimeObject {
  date: string;
  time: string;
}

@Pipe({
  name: 'orderByDateTime',
  standalone: true,
})
export class OrderByDateTimePipe implements PipeTransform {
  transform<T extends DateTimeObject>(
    value: T[],
    order: 'asc' | 'desc' = 'asc'
  ): T[] {
    return value.sort((a, b) => {
      const aDateTime = new Date(a.date + ' ' + a.time);
      const bDateTime = new Date(b.date + ' ' + b.time);

      if (order === 'asc') {
        return aDateTime.getTime() - bDateTime.getTime();
      } else if (order === 'desc') {
        return bDateTime.getTime() - aDateTime.getTime();
      }

      return 0;
    });
  }
}
