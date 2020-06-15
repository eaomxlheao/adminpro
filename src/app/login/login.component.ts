import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Usuario } from "../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from "../services/service.index";

declare function init_plugins();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public email: string;
  public recuerdame: boolean = false;
  constructor(public router: Router, public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario: Usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );
    this.usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe((resp: any) => {
        this.router.navigate(["/dashboard"]);
      });
  }
}
