import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Student } from '../../Models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {


  private apiUrl = 'http://localhost:25524/api/student'; 

  constructor(private http: HttpClient) {}


  getStudents(search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search=${search}`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // updateStudent(id: number, student: Student): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${id}`, student);
  // }
  updateStudent(id: number, student: Student): Observable<void> {
    console.log('Student data being sent:', student);
    return this.http.put<void>(`${this.apiUrl}/${id}`, student, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API error:', error);
        return throwError(() => new Error(error.message || 'Server Error'));
      })
    );
  }
  

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
