import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BusquedaService } from "../../services/service.index";
import { Usuario } from "../../models/usuario.model";
import { Medico } from "../../models/medico.model";
import { Hospital } from "src/app/models/hospital.model";

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styleUrls: ["./busqueda.component.css"],
})
export class BusquedaComponent implements OnInit {
  termino: string = "";
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public busquedaService: BusquedaService,
    public router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.termino = params["termino"];
      if (this.termino) {
        this.buscar();
      }
    });
  }

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.busquedaService.buscar(this.termino).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
    });
  }
}
