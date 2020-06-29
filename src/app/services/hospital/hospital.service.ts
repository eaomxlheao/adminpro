import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";
import { Hospital } from "../../models/hospital.model";
import Swal from "sweetalert2";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root",
})
export class HospitalService {
  constructor(
    public http: HttpClient,
    public subirArchivoService: SubirArchivoService,
    public usuarioService: UsuarioService
  ) {}

  cargarHospitales() {
    let url = URL_SERVICIOS + "/hospital";
    return this.http.get(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    );
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + "/hospital";
    return this.http.post(url, { nombre: nombre }).pipe(
      map((resp: any) => {
        Swal.fire({
          title: "Created Hospital",
          text: nombre,
          icon: "success",
        });
        return resp.hospital;
      })
    );
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/hospitales/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospitales;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + "/hospital/" + hospital._id;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          title: "Updated hospital",
          text: resp.hospital.nombre,
          icon: "success",
        });
        return resp.hospital;
      })
    );
  }

  guardarImagen(archivo: File, id: string) {
    this.subirArchivoService
      .subirArchivo(archivo, "hospitales", id)
      .then((resp: any) => {
        Swal.fire({
          title: "Updated hospital",
          text: resp.hospital.nombre,
          icon: "success",
        });
        console.log(resp);
      })
      .catch((response) => {
        console.log(response);
      });
  }
}
