import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../../Models/Teacher';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'http://localhost:25524/api/Teacher'; 

  constructor(private http: HttpClient) {}


  // teacher.service.ts
getTeachers(): Observable<Teacher[]> {
  return this.http.get<Teacher[]>(this.apiUrl).pipe(
    catchError(this.handleError)
  );
}


  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateTeacher(id: number, teacher: Teacher): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, teacher, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
