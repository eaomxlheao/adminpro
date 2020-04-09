import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
})
export class ProgressComponent implements OnInit {
  public porcentaje: number;
  constructor() {
    this.porcentaje = 0;
  }

  ngOnInit(): void {}
}
