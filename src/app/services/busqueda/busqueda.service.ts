import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BusquedaService {
  constructor(public http: HttpClient) {}
  buscar(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/todo/" + termino;
    return this.http.get(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
