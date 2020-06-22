import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Hospital } from "src/app/models/hospital.model";
import {
  HospitalService,
  MedicoService,
  ModalUploadService,
} from "../../services/service.index";
import { Medico } from "src/app/models/medico.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styleUrls: ["./medico.component.css"],
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico("", "", "", "", "");
  hospital: Hospital = new Hospital("", "xxx", "", null);

  constructor(
    public hospitalService: HospitalService,
    public medicoService: MedicoService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    this.activatedRouter.params.subscribe((params) => {
      let id = params["id"];
      if (id !== "new") {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit(): void {
    this.hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });

    this.modalUploadService.notificacion.subscribe((resp) => {
      this.medico.imagen = resp.medico.imagen;
    });
  }

  cargarMedico(id: string) {
    this.medicoService.obtenerMedico(id).subscribe((resp: any) => {
      this.medico = resp;
      this.medico.hospital = resp.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this.medicoService.guardarMedico(this.medico).subscribe((resp: any) => {
      this.router.navigate(["/medico/", resp._id]);
    });
  }

  cambioHospital(id: string) {
    if (id !== "") {
      this.hospitalService.obtenerHospital(id).subscribe((resp) => {
        this.hospital = resp;
      });
    }
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal("medicos", this.medico._id);
  }
}
