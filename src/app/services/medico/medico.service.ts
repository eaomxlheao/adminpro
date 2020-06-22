import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";
import { UsuarioService } from "../usuario/usuario.service";
import { Medico } from "../../models/medico.model";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class MedicoService {
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}

  cargarMedicos() {
    let url = URL_SERVICIOS + "/medico";
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medicos;
      })
    );
  }

  buscarMedico(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/medicos/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medicos;
      })
    );
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + "/medico/" + id;
    return this.http
      .delete(url, { headers: { Token: this.usuarioService.token } })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + "/medico";
    if (medico._id) {
      url = url + "/" + medico._id;
      this.http
        .put(url, medico, { headers: { Token: this.usuarioService.token } })
        .pipe(
          map((resp: any) => {
            return resp;
          })
        );
    } else {
      return this.http
        .post(url, medico, { headers: { Token: this.usuarioService.token } })
        .pipe(
          map((resp: any) => {
            Swal.fire({
              title: "Doctor created",
              text: medico.nombre,
              icon: "success",
            });
            return resp.medico;
          })
        );
    }
  }

  obtenerMedico(id: string) {
    let url = URL_SERVICIOS + "/medico/" + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medico;
      })
    );
  }
}
