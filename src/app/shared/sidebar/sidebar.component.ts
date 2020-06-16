import { Component, OnInit } from "@angular/core";
import { SidebarService, UsuarioService } from "../../services/service.index";
import { Usuario } from "../../models/usuario.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  constructor(
    public sideBarService: SidebarService,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.usuarioService.logout();
  }
}
