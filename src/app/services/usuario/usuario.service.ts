import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";

import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(public http: HttpClient) {}

  login(usuario: Usuario, recordar: boolean = false) {
    let url = URL_SERVICIOS + "/login";
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        localStorage.setItem("id", resp.usuario._id);
        localStorage.setItem("token", resp.token);
        localStorage.setItem("usuario", JSON.stringify(resp.usuario));
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
}
