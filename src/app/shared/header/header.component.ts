import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/service.index";
import { Usuario } from "src/app/models/usuario.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  constructor(public usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  logout() {
    this.usuarioService.logout();
  }
}
