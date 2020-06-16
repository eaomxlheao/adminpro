import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";

import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  estaLogueado(): boolean {
    if (this.token) {
      return this.token.length > 0 ? true : false;
    }
    return false;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    this.guardarUsuarioEnLocalStorage(id, usuario);
    localStorage.setItem("token", token);
    this.token = token;
  }

  guardarUsuarioEnLocalStorage(id: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuario = usuario;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.usuario._id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  limpiarUsuarioDeLocalStorage() {
    this.usuario = null;
    localStorage.removeItem("usuario");
    localStorage.removeItem("id");
  }

  logout() {
    this.token = "";
    localStorage.removeItem("token");
    this.limpiarUsuarioDeLocalStorage();
    this.router.navigate(["/login"]);
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "/login";
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.usuario._id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          title: "Usuario creado",
          text: usuario.email,
          icon: "success",
        });
        return resp.usuario;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario/" + usuario._id;
    return this.http
      .put(url, usuario, {
        headers: { Token: localStorage.getItem("token") },
      })
      .pipe(
        map((resp: any) => {
          this.limpiarUsuarioDeLocalStorage();
          this.guardarUsuarioEnLocalStorage(resp.usuario._id, resp.usuario);
          Swal.fire({
            title: "Updated user",
            text: resp.usuario.nombre,
            icon: "success",
          });
          return resp.usuario;
        })
      );
  }
}
