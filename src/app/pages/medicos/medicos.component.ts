import { Component, OnInit } from "@angular/core";
import { Medico } from "../../models/medico.model";
import { ModalUploadService } from "../../services/service.index";
import { MedicoService } from "../../services/medico/medico.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styleUrls: ["./medicos.component.css"],
})
export class MedicosComponent implements OnInit {
  totalRegistros: number = 0;
  medicos: Medico[] = [];
  cargando: boolean = true;

  constructor(
    public modalUploadService: ModalUploadService,
    public medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((resp) => {
      this.medicos = resp;
      this.totalRegistros = this.medicos.length;
      this.cargando = false;
    });
  }

  buscarMedicos(termino: string) {
    if (termino.length <= 2) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this.medicoService.buscarMedico(termino).subscribe((resp) => {
      this.medicos = resp;
      this.totalRegistros = this.medicos.length;
      this.cargando = false;
    });
  }

  borrarMedico(id: string) {
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
        this.medicoService.borrarMedico(id).subscribe((resp) => {
          Swal.fire("Deleted!", "The doctor has been deleted.", "success");
          this.cargarMedicos();
        });
      }
    });
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal("medicos", id);
  }
}
