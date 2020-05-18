import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
})
export class PromesasComponent implements OnInit {
  constructor() {
    let promesa = new Promise((resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);

        if (contador === 3) {
          resolve("OK!");
          clearInterval(intervalo); //Detiene la promesa
        } else if (contador >= 4) {
          reject("Fallo en intervalo, contador >3");
          clearInterval(intervalo); //Detiene la promesa
        }
      }, 1000);
    });

    promesa
      .then((mensaje) => console.log("Termino", mensaje))
      .catch((mensaje) => console.log("Error en la promesa", mensaje));
  }

  ngOnInit(): void {}
}
