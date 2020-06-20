import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import {
  UsuarioService,
  ModalUploadService,
} from "../../services/service.index";
import Swal from "sweetalert2";

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

  constructor(
    public usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe((resp) => {
      this.cargarUsuarios();
    });
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
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario(termino).subscribe((resp) => {
      this.usuarios = resp;
      this.totalRegistros = this.usuarios.length;
      this.cargando = false;
    });
  }

  borrarUsuario(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.usuarioService.buscarUsuario(id).subscribe((resp) => {
          Swal.fire("Deleted!", "The user has been deleted.", "success");
          this.cargarUsuarios();
          if (this.usuarios.length === 0) {
            this.desde = 0;
            this.cargarUsuarios();
          }
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe((resp) => {});
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal("usuarios", id);
  }
}
