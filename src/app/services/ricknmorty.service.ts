import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class RicknmortyapiService {

  apiUrl = 'https://rickandmortyapi.com/api/character';

  nextUrl: string | null = null;
  previousUrl: string | null = null;
  info!:any;

  private behaviorSubjectData = new BehaviorSubject<any>(null);
  triggerData$ = this.behaviorSubjectData.asObservable()

  constructor(private http: HttpClient,
    
  ) { }

  // Método para obtener la primera página
  getFirstPage() {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      tap((response) => {
        this.nextUrl = response.info.next;
        this.previousUrl = response.info.prev;
        this.behaviorSubjectData.next(response.results);
      })
    );
  }

  getNextPage(): Observable<ApiResponse> {
    const urlToUse = this.nextUrl || this.apiUrl;  // Si no hay siguiente, usa la URL por defecto

    return this.http.get<ApiResponse>(urlToUse).pipe(
      tap(response => {
        this.nextUrl = response.info.next;
        this.previousUrl = response.info.prev;
        this.behaviorSubjectData.next(response.results);
      })
    );
  }

  getPreviousPage(): Observable<ApiResponse> {
    
    const urlToUse = this.previousUrl || this.apiUrl;  // Si no hay página anterior, usa la URL por defecto

    return this.http.get<ApiResponse>(urlToUse).pipe(
      tap(response => {
        this.nextUrl = response.info.next;
        this.previousUrl = response.info.prev;
        this.behaviorSubjectData.next(response.results);
      })
    );
  }
}
