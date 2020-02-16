import { Component, OnInit, EventEmitter, Output } from "@angular/core";

interface Excercise {
  value: number;
  viewValue: string;
}
@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  constructor() {}
  @Output() trainingStart = new EventEmitter<void>();
  excercises: Excercise[] = [
    { value: 0, viewValue: "Running" },
    { value: 1, viewValue: "Cycling" },
    { value: 2, viewValue: "Walking" },
    { value: 3, viewValue: "Jumping Jacks" }
  ];

  onStartTraining() {
    this.trainingStart.emit();
  }
  ngOnInit() {}
}
