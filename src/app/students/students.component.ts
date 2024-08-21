import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../Models/Student';
import { StudentsService } from '../Services/students.service';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AddStudentComponent } from './add-student/add-student.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatIconModule,MatButtonModule, MatPaginatorModule, MatFormField,MatLabel,ReactiveFormsModule ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  private dialogOpen = false; 
  displayedColumns: string[] = ['id', 'name', 'age', 'class', 'rollNumber', 'actions'];
  dataSource = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog) {}
  private studentService = inject(StudentsService);
  students: Student[] = [];
  searchControl = new FormControl('');
  noRecordsFound = false;  

  ngOnInit(): void {
    this.loadStudents();
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });
  }
  applyFilter(filterValue: string | null): void {
  
    this.dataSource.filter = (filterValue || '').trim().toLowerCase();
    this.noRecordsFound = this.dataSource.filteredData.length === 0; 
  }
  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.dataSource.data = students;
        console.log("students",students[0].students);
        this.noRecordsFound = students.length === 0;  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
   }

  deleteStudent(id: number): void {
    console.log(id  )
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  openDialog(): void {
    if (this.dialogOpen) {
      return;  // Prevent opening multiple dialogs
    }
    this.dialogOpen = true;

    const dialogRef = this.dialog.open(AddStudentComponent, {
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      disableClose: true, 
      backdropClass: 'custom-backdrop', 
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;  

      if (result) {
        this.loadStudents(); 
     
      }
    });
}
openEditDialog(student: Student): void {
  const dialogRef = this.dialog.open(AddStudentComponent, {
    width: '400px',
    data: {  student }, 
    panelClass: 'custom-dialog-container',
    hasBackdrop: true,
    disableClose: true,
    backdropClass: 'custom-backdrop'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Student updated:', result);
      window.location.reload(); 
      
    }
    this.dialogOpen = false; 
  });
}
}
