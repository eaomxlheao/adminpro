import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "../../services/usuario/usuario.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public usuario: Usuario;

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
}
