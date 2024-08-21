import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Subject } from '../../Models/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiUrl = 'https://localhost:5001/api/subjects'; 

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.apiUrl);
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.apiUrl, subject);
  }
  updateSubject(id: number, teacher: Subject): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, teacher, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      // catchError(this.handleError)x  x 
    );
  }

}
