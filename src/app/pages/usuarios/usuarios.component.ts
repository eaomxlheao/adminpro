import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../services/service.index";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(cambio: number) {
    let desde = this.desde + cambio;
    this.cargarUsuarios();
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde = desde;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 2) {
      this.cargarUsuarios();
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario(termino).subscribe((resp) => {
      this.usuarios = resp;
      this.totalRegistros = this.usuarios.length;
      this.cargando = false;
    });
  }
}
