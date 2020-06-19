import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { SubirArchivoService } from "../../services/subir-archivo/subir-archivo.service";
import { ModalUploadService } from "./modal-upload.service";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styleUrls: ["./modal-upload.component.css"],
})
export class ModalUploadComponent implements OnInit {
  public imagenTemp: string;
  public imagenASubir: File;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {}

  subirImagen() {
    this.subirArchivoService
      .subirArchivo(
        this.imagenASubir,
        this.modalUploadService.tipo,
        this.modalUploadService.id
      )
      .then((resp) => {
        this.modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch((err) => {});
  }

  cerrarModal() {
    this.imagenASubir = null;
    this.imagenTemp = null;
    this.modalUploadService.ocultarModal();
  }

  seleccionarImagen(archivo: File) {
    if (!archivo) {
      this.imagenASubir = null;
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      Swal.fire({
        title: "Only images",
        text: "The selected file is not an image",
        icon: "error",
      });
      this.imagenASubir = null;
      return;
    }

    this.imagenASubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result as string);
  }
}
