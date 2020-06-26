import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  SharedService,
  SettingsService,
  SidebarService,
  UsuarioService,
  HospitalService,
  MedicoService,
  LoginGuard,
  AdminGuard,
  SubirArchivoService,
  ModalUploadService,
  BusquedaService,
  VerificaTokenGuard,
} from "./service.index";

import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    SharedService,
    SettingsService,
    SidebarService,
    UsuarioService,
    HospitalService,
    MedicoService,
    LoginGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    BusquedaService,
    VerificaTokenGuard,
  ],
})
export class ServiceModule {}
