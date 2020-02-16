import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { StopTrainingComponent } from "./stop-training.component";
import { SuccessTrainingComponent } from "./success-training.component";

export interface DialogData {}
@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"]
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingStop = new EventEmitter<void>();
  progress = 0;
  timer: number;
  isExcerciseSuccess = false;
  excerciseState = "Pause";

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    if (this.excerciseState == "Resume") {
      this.excerciseState = "Pause";
    }
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.isExcerciseSuccess = true;
        const dialogRef = this.dialog.open(SuccessTrainingComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (!result) {
            this.trainingStop.emit();
          } else {
            this.progress = 0;
            this.isExcerciseSuccess = false;
            this.startOrResumeTimer();
          }
        });
      }
    }, 1000);
  }

  pauseTraining() {
    if (this.excerciseState == "Pause") {
      clearInterval(this.timer);
      this.excerciseState = "Resume";
    } else {
      this.startOrResumeTimer();
      this.excerciseState = "Pause";
    }
  }

  stopTraining() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingStop.emit();
      } else {
        this.startOrResumeTimer();
        this.isExcerciseSuccess = false;
      }
    });
  }
}
