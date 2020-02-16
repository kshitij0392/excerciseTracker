import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-success-training",
  template: `
    <h1 mat-dialog-title>Success! Keep it Up</h1>
    <mat-dialog-content>
      <p>You have successfully completed this excercise</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">
        Restart
      </button>
      <button mat-button [mat-dialog-close]="false">
        Select New Excercise
      </button>
    </mat-dialog-actions>
  `
})
export class SuccessTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
