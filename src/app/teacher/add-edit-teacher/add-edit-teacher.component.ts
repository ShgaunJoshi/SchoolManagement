import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../../Models/Student';
import { StudentsService } from '../../Services/students.service';
import { AddStudentComponent } from '../../students/add-student/add-student.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../../Models/Teacher';
import { TeacherService } from '../../Services/teacher.service';
import { MatOptionModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-add-edit-teacher',
  standalone: true,
  imports: [MatFormFieldModule,MatDialogModule,ReactiveFormsModule,MatSnackBarModule,CommonModule,MatOptionModule,MatDialogModule,MatRadioModule],
  templateUrl: './add-edit-teacher.component.html',
  styleUrl: './add-edit-teacher.component.css'
})
export class AddEditTeacherComponent {
  isEditMode: boolean = false;
  teacherForm !:FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { teacher?: Teacher},
    private teacherService: TeacherService,
    public dialogRef: MatDialogRef<AddEditTeacherComponent>,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
  this.isEditMode = !!this.data.teacher;

    this.teacherForm = this.fb.group({
      name: [this.data.teacher?.name || '', Validators.required],
      age: [this.data.teacher?.age || null, [Validators.required, Validators.min(1)]],
      sex: [this.data.teacher?.sex || '', Validators.required],
      image: [this.data.teacher?.image || '']
    });
  }
  onSave(): void {
    if (this.teacherForm.valid) {
      const teacherData: Teacher = this.teacherForm.value;

      if (this.isEditMode) {
        this.updateTeacher(teacherData);

      } else {
        this.addTeacher(teacherData);
      }
    }
  }

  addTeacher(teacherData: Teacher): void {
    this.teacherService.createTeacher(teacherData).subscribe(
      (teacher) => {
        // this.snackBar.open('Teacher added successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(teacher);
    
      },
      (error) => {
        console.error('Error creating teacher:', error);
        this.snackBar.open('Failed to add teacher. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }

  updateTeacher(teacherData: Teacher): void {
    if (this.data.teacher?.id) {
      this.teacherService.updateTeacher(this.data.teacher.id, teacherData).subscribe(
        () => {
          this.snackBar.open('Teacher updated successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(teacherData);
        },
        (error) => {
          console.error('Error updating teacher:', error);
        
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
