import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";

declare function init_plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor() {}

  ngOnInit(): void {
    init_plugins();
    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      { validators: this.sonIguales("password", "password2") }
    );

    this.forma.setValue({
      nombre: "EduArdO",
      correo: "eaomxlheao@gmail.com",
      password: "moquito1",
      password2: "moquito1",
      condiciones: false,
    });
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal.fire({
        title: "Importante",
        text: "Debe aceptar las condiciones",
        icon: "warning",
      });
    }

    console.log(this.forma.value);
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let val1 = group.controls[campo1].value;
      let val2 = group.controls[campo2].value;

      if (val1 === val2) {
        return null;
      }
      return {
        sonDiferentes: true,
      };
    };
  }
}
