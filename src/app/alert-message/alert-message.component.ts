import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent {


  constructor(private snackBar: MatSnackBar) {}

  showSuccessMessage(): void {
    this.snackBar.open('Operation successful!', 'Close', {
      duration: 3000,  
      panelClass: ['success-snackbar']  
    });
  }

  showErrorMessage(): void {
    this.snackBar.open('An error occurred!', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

}
