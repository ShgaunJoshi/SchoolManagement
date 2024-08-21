import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { SubjectService } from '../../Services/subject.service';
import { Subject } from '../../../Models/Subject';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-edit-subject',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './add-edit-subject.component.html',
  styleUrls: ['./add-edit-subject.component.css']
})
export class AddEditSubjectComponent {
  subjectForm: FormGroup;
  isEditMode: boolean = false;
  @ViewChild('chipList') chipList: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEditSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { subject?: Subject }
  ) {
    this.isEditMode = !!data.subject;
    this.subjectForm = this.fb.group({
      name: [data.subject?.name || '', Validators.required],
      class: [data.subject?.class || '', Validators.required],
      languages: [data.subject?.languages || [], Validators.required]
    });
  }

  addLanguage(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const languages = this.subjectForm.get('languages')?.value || [];
      languages.push(value.trim());
      this.subjectForm.get('languages')?.setValue(languages);
    }

    if (input) {
      input.value = '';
    }
  }

  removeLanguage(language: string): void {
    const languages = this.subjectForm.get('languages')?.value || [];
    const index = languages.indexOf(language);

    if (index >= 0) {
      languages.splice(index, 1);
      this.subjectForm.get('languages')?.setValue(languages);
    }
  }

  onSave(): void {
    if (this.subjectForm.valid) {
      const subjectData: Subject = this.subjectForm.value;

      if (this.isEditMode) {
        this.subjectService.updateSubject(this.data.subject!.id!, subjectData).subscribe(
          () => {
            
            this.dialogRef.close(subjectData);
          },
          (error) => {
            console.error('Error updating subject:', error);
            this.snackBar.open('Failed to update subject. Please try again.', 'Close', { duration: 3000 });
          }
        );
      } else {
        this.subjectService.createSubject(subjectData).subscribe(
          (subject) => {
          
            this.dialogRef.close(subject);
          },
          (error) => {
            console.error('Error creating subject:', error);
          
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
