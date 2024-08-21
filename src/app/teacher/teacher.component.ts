import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TeacherService } from '../Services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { Teacher } from '../../Models/Teacher';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddEditTeacherComponent } from './add-edit-teacher/add-edit-teacher.component';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatIconModule,MatButtonModule, MatPaginatorModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent  implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'age', 'sex', 'image',"actions"];
  dataSource = new MatTableDataSource<Teacher>();
  private dialogOpen = false; 

  constructor(private teacherService: TeacherService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe((teachers: Teacher[]) => {
      this.dataSource.data = teachers;
    });
  }


  openTeacherDialog(teacher?: Teacher): void {
    if (this.dialogOpen) {
      return;  
    }
    this.dialogOpen = true;

    const dialogRef = this.dialog.open(AddEditTeacherComponent, {
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      disableClose: true,
      backdropClass: 'custom-backdrop',
      width: '400px',
      data: { teacher:teacher||null,isEditMode: !!teacher}
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTeachers();  
      }
    });
  }

  deleteteacher(id: number): void {
    console.log(id  )
    this.teacherService.deleteTeacher(id).subscribe(() => {
      this.getTeachers();
    });
  }
  openEditDialog(teacher :Teacher){
    const dialogRef = this.dialog.open(AddEditTeacherComponent, {
      width: '400px',
      data: {  teacher },  
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
    

