import { Component } from '@angular/core';
import { TeacherComponent } from '../teacher/teacher.component';
import { StudentsComponent } from '../students/students.component';
import { SubjectComponent } from '../subject/subject.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [StudentsComponent,TeacherComponent,SubjectComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
