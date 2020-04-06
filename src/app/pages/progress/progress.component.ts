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

  public cambiarValor(valor: number) {
    this.porcentaje = +this.porcentaje;
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }

    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + valor;
  }
}
