import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input() leyenda: string = "Leyenda";
  @Input() porcentaje: number = 0;

  @Output() CambioDePorcentaje: EventEmitter<number> = new EventEmitter();
  constructor() {}

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
    this.CambioDePorcentaje.emit(this.porcentaje);
  }
}
