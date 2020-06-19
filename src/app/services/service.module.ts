import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  SharedService,
  SettingsService,
  SidebarService,
  UsuarioService,
  LoginGuard,
  SubirArchivoService,
  ModalUploadService,
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
    LoginGuard,
    SubirArchivoService,
    ModalUploadService,
  ],
})
export class ServiceModule {}
