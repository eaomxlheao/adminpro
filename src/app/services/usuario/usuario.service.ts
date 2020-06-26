import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map, catchError } from "rxjs/operators";

import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import { throwError } from "rxjs/internal/observable/throwError";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + "/login/renuevatoken";
    return this.http.get(url, { headers: { Token: this.token } }).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem("token", this.token);
        return true;
      }),
      catchError((err) => {
        this.router.navigate(["/login"]);
        return throwError(err);
      })
    );
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
      this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    this.guardarUsuarioEnLocalStorage(id, usuario, menu);
    localStorage.setItem("token", token);
    this.token = token;
  }

  guardarUsuarioEnLocalStorage(id: string, usuario: Usuario, menu: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));
    this.menu = menu;
    this.usuario = usuario;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(
          resp.usuario._id,
          resp.token,
          resp.usuario,
          resp.menu
        );
        return true;
      })
    );
  }

  limpiarUsuarioDeLocalStorage() {
    this.usuario = null;
    this.menu = [];
    localStorage.removeItem("usuario");
    localStorage.removeItem("id");
    localStorage.removeItem("menu");
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
        this.guardarStorage(
          resp.usuario._id,
          resp.token,
          resp.usuario,
          resp.menu
        );
        return true;
      }),
      catchError((err) => {
        return throwError(err.error.message);
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          title: "Created user",
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
          if (this.usuario._id === resp.usuario._id) {
            this.limpiarUsuarioDeLocalStorage();
            this.guardarUsuarioEnLocalStorage(
              resp.usuario._id,
              resp.usuario,
              this.menu
            );
          }
          Swal.fire({
            title: "Updated user",
            text: resp.usuario.nombre,
            icon: "success",
          });
          return resp.usuario;
        })
      );
  }

  guardarImagen(archivo: File, id: string) {
    this.subirArchivoService
      .subirArchivo(archivo, "usuarios", id)
      .then((resp: any) => {
        this.guardarUsuarioEnLocalStorage(
          resp.usuario._id,
          resp.usuario,
          this.menu
        );
        Swal.fire({
          title: "Updated user",
          text: resp.usuario.nombre,
          icon: "success",
        });
        console.log(resp);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  cargarUsuarios(desde: number) {
    let url = URL_SERVICIOS + "/usuario?desde=" + desde;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  buscarUsuario(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/usuarios/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.usuarios;
      })
    );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + "/usuario/" + id;
    return this.http
      .delete(url, {
        headers: { Token: localStorage.getItem("token") },
      })
      .pipe(
        map((resp: any) => {
          return true;
        })
      );
  }
}
