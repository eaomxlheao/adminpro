import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModalUploadService {
  public tipo: string;
  public id: string;
  public visibilidad: string = "oculto";
  public notificacion = new EventEmitter<any>();

  constructor() {}

  ocultarModal() {
    this.visibilidad = "oculto";
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.tipo = tipo;
    this.id = id;
    this.visibilidad = "";
  }
}
