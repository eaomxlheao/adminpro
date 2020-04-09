import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  leyenda: string;
  porcentaje: number;
  constructor() {
    this.porcentaje = 0;
  }

  ngOnInit(): void {
    this.leyenda = "Leyenda";
  }

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
