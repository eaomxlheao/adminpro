import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
})
export class ProgressComponent implements OnInit {
  public porcentaje1: number;
  public porcentaje2: number;
  constructor() {
    this.porcentaje1 = 75;
    this.porcentaje2 = 50;
  }

  ngOnInit(): void {}

  //ActualizaProcentaje(event: number) {}
}
