import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "../../services/usuario/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public usuario: Usuario;
  public imagenASubir: File;
  public imagenTemp: string;

  constructor(public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((resp) => {});
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

  cambiarImagen() {
    this.usuarioService.guardarImagen(this.imagenASubir, this.usuario._id);
  }
}
