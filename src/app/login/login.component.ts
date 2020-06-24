import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Usuario } from "../models/usuario.model";
import { UsuarioService } from "../services/service.index";
import { element } from "protractor";
import Swal from "sweetalert2";

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public email: string;
  public recuerdame: boolean = false;
  public auth2; // The Sign-In object.

  constructor(public router: Router, public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "731389811270-1o1en3guv7q2n80cjrrsi2kuj0a8fs1o.apps.googleusercontent.com",
        coockiepolicy: "single_host_origin",
        scope: "profile email",
      });

      this.attachSignIn(document.getElementById("btnGoogle"));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe((resp: any) => {
        //this.router.navigate(["/dashboard"]);
        window.location.href = "#/dashboard";
      });
    });
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
    /*
    this.usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe((resp: any) => {
        //this.router.navigate(["/dashboard"]);
        window.location.href = "#/dashboard";
      
      });
      */
    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(
      (ok) => {
        window.location.href = "#/dashboard";
      },
      (err) => {
        Swal.fire({
          title: "Login error",
          text: err,
          icon: "error",
        });
      }
    );
  }
}
