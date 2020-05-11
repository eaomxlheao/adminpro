import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @ViewChild("txtPorcentaje") txtProcentaje: ElementRef;

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

  public onChange(newValue: number) {
    //let elHTML: any = document.getElementsByName("porcentaje")[0];

    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    //elHTML.value = this.porcentaje;

    this.txtProcentaje.nativeElement.value = this.porcentaje;
    this.CambioDePorcentaje.emit(this.porcentaje);
    this.txtProcentaje.nativeElement.focus();
  }
}
