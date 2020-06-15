import { Component, OnInit } from "@angular/core";
import { SidebarService, UsuarioService } from "../../services/service.index";
import { Usuario } from "../../models/usuario.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public usuario: Usuario;
  constructor(
    public sideBarService: SidebarService,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }
}
