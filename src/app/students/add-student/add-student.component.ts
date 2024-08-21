import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentsService } from '../../Services/students.service';
import { Student } from '../../../Models/Student';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [MatFormFieldModule,MatDialogModule,ReactiveFormsModule,MatSnackBarModule,CommonModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent implements OnInit {

  studentForm!: FormGroup;
  
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { student?: Student },
    private studentService: StudentsService,
    public dialogRef: MatDialogRef<AddStudentComponent>,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data.student;

    this.studentForm = this.fb.group({
      name: [this.data.student?.name || '', Validators.required],
      age: [this.data.student?.age || null, [Validators.required, Validators.min(1)]],
      class: [this.data.student?.class || '', Validators.required],
      rollNumber: [this.data.student?.rollNumber || null, [Validators.required, Validators.min(1)]],
      image: [this.data.student?.image || '']
    });
  }



  onSave(): void {
    console.log("Click");
  
    if (this.studentForm.valid) {
      const studentData = {
        ...this.studentForm.value,
        age: Number(this.studentForm.value.age),
        rollNumber: Number(this.studentForm.value.rollNumber)
      };
      console.log('Form Data:', studentData);
  
      // Convert numeric fields to string
      // studentData.rollNumber = studentData.rollNumber.toString();
      // studentData.age = studentData.age.toString();
  
      if (this.isEditMode) {
        this.updateStudents(studentData,);
      } else {
        this.addStudent(studentData);
      }
    }
  }
  
  addStudent(studentData: Student): void {
    this.studentService.createStudent(studentData).subscribe(
      (student) => {
        //this.snackBar.open('Student added successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(student);
        window.location.reload();
        // Reload the page after the dialog has closed
     
      },
      (error) => {
        console.error('Error creating student:', error);
        this.snackBar.open('Failed to add student. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }
  
  updateStudents(studentData: Student): void {
    console.log("studentData", studentData);
  
    if (this.data.student?.id) {
      console.log("",this.data.student?.id)
      const data =this.data.student?.id;
      this.studentService.updateStudent(data, studentData).subscribe(
        () => {
          console.log("studentData being sent:", studentData);
          this.dialogRef.close(studentData);
          // Reload the page after the dialog has closed
          this.dialogRef.afterClosed().subscribe(() => {
            window.location.reload();
          });
        },
        (error:HttpErrorResponse) => {
          console.error('Error status:', error.status); // Status code (e.g., 400)
          console.error('Error details:', error.error); 
 //         this.snackBar.open('Failed to update student. Please try again.', 'Close', { duration: 3000 });
        }
      );
    }
  }
  
  

  onCancel(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 100);  // Short delay before closing
  }
}
