import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Subject } from '../../Models/Subject';
import { SubjectService } from '../Services/subject.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditSubjectComponent } from './add-edit-subject/add-edit-subject.component';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
     MatPaginatorModule,
      MatFormField,
      MatLabel,
      ReactiveFormsModule ,
      MatChipsModule,
       MatChipsModule,
      MatIconModule,
      MatInputModule ],

  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent  implements OnInit{
  private dialogOpen = false; 
 
  subjects: Subject[] = [];
  displayedColumns: string[] = ['name', 'class', 'languages'];

  constructor(private subjectService: SubjectService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }
  openAddSubjectDialog(): void {
    if (this.dialogOpen) {
      return; 
    }
    this.dialogOpen = true;

    const dialogRef = this.dialog.open(AddEditSubjectComponent, {
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
        this.loadSubjects(); 
     
      }
    });
}
openEditDialog(student: Subject): void {
  const dialogRef = this.dialog.open(AddEditSubjectComponent, {
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



  

  deleteteacher(id :number){}
  }

