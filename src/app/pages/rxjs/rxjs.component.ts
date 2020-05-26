import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { retry, map, filter } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styleUrls: ["./rxjs.component.css"],
})
export class RXJSComponent implements OnInit {
  subs: Subscription;

  constructor() {
    this.subs = this.regresaObservable().subscribe(
      (numero) => console.log("Subs: ", numero),
      (error) => console.error("Error en el obs: ", error),
      () => console.log("El observable termino")
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log("Dejando la pagina");
    this.subs.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;
        const salida = { valor: contador };
        observer.next(salida);

        if (contador === 30) {
          clearInterval(intervalo);
          observer.complete();
        }

        //if (contador === 2) {
        ////cleaetrInterval(intervalo);
        //observer.error("Auxilio!");
        //}
      }, 1000);
    }).pipe(
      retry(3),
      map((response: any) => {
        return response.valor;
      }),
      filter((valor, index) => {
        //a fuerza debe regresar un booleano

        //Valor es el valor de la respuesta
        //Index es en base 0 las veces que se ha llamado
        //console.log("Filter: ", valor, index);

        if (valor % 2 === 1) {
          //impar
          return true;
        }
        {
          //par
          return false;
        }
      })
    );
  }
}
