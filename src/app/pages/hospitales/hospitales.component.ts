import { Component, OnInit } from "@angular/core";
import {
  HospitalService,
  ModalUploadService,
} from "../../services/service.index";
import { Hospital } from "src/app/models/hospital.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styleUrls: ["./hospitales.component.css"],
})
export class HospitalesComponent implements OnInit {
  cargando: boolean = true;
  totalRegistros: number = 0;
  hospitales: Hospital[] = [];
  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe((resp) => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 2) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.hospitalService.buscarHospital(termino).subscribe((resp) => {
      this.hospitales = resp;
      this.totalRegistros = this.hospitales.length;
      this.cargando = false;
    });
  }

  borrarHospital(id: string) {
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
        this.hospitalService.borrarHospital(id).subscribe((resp) => {
          Swal.fire("Deleted!", "The hospital has been deleted.", "success");
          this.cargarHospitales();
        });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe((resp) => {});
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal("hospitales", id);
  }

  async crearHospital() {
    const { value: nombre } = await Swal.fire({
      title: "Enter the hospital's name",
      input: "text",
      inputValue: "",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (nombre) {
      this.hospitalService.crearHospital(nombre as string).subscribe((resp) => {
        Swal.fire("Created!", "The hospital has been created.", "success");
        this.cargarHospitales();
      });
    }
  }
}
