import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  private readonly apiUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}

  getAdressbyCep(cep:string): Observable<any> {
    const url = `${this.apiUrl}${cep}/json/`;
    return this.http.get(url).pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error('Erro ao buscar o endereço pelo CEP:', error);
        throw error;
      })
    );
  }
}
