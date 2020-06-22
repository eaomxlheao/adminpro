import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/service.index";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  constructor(public usuarioService: UsuarioService, public router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.usuarioService.logout();
  }

  buscar(termino: string) {
    this.router.navigate(["/busqueda", termino]);
  }
}
