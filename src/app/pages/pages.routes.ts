import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RXJSComponent } from "./rxjs/rxjs.component";
import { LoginGuard, AdminGuard } from "../services/service.index";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { HospitalesComponent } from "./hospitales/hospitales.component";
import { MedicosComponent } from "./medicos/medicos.component";
import { MedicoComponent } from "./medicos/medico.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";

const pagesRoutes: Routes = [
  /*
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { titulo: "Dashboard" },
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "Progress" },
      },
      {
        path: "graficas1",
        component: Graficas1Component,
        data: { titulo: "Graficas" },
      },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajuste de tema" },
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas" },
      },
      { path: "rxjs", component: RXJSComponent, data: { titulo: "RxJs" } },
      {
        path: "profile",
        component: ProfileComponent,
        data: { titulo: "Perfil de Usuario" },
      },
      {
        path: "usuarios",
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { titulo: "Gestion de Usuarios" },
      },
      {
        path: "hospitales",
        component: HospitalesComponent,
        data: { titulo: "Gestion de Hospitales" },
      },
      {
        path: "medicos",
        component: MedicosComponent,
        data: { titulo: "Gestion de Medicos" },
      },
      {
        path: "medico/:id",
        component: MedicoComponent,
        data: { titulo: "Actualizar Medico" },
      },
      {
        path: "busqueda/:termino",
        component: BusquedaComponent,
        data: { titulo: "Buscador" },
      },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    ],*/

  //Lazy Load
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { titulo: "Dashboard" },
  },
  {
    path: "progress",
    component: ProgressComponent,
    data: { titulo: "Progress" },
  },
  {
    path: "graficas1",
    component: Graficas1Component,
    data: { titulo: "Graficas" },
  },
  {
    path: "account-settings",
    component: AccountSettingsComponent,
    data: { titulo: "Ajuste de tema" },
  },
  {
    path: "promesas",
    component: PromesasComponent,
    data: { titulo: "Promesas" },
  },
  { path: "rxjs", component: RXJSComponent, data: { titulo: "RxJs" } },
  {
    path: "profile",
    component: ProfileComponent,
    data: { titulo: "Perfil de Usuario" },
  },
  {
    path: "usuarios",
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { titulo: "Gestion de Usuarios" },
  },
  {
    path: "hospitales",
    component: HospitalesComponent,
    data: { titulo: "Gestion de Hospitales" },
  },
  {
    path: "medicos",
    component: MedicosComponent,
    data: { titulo: "Gestion de Medicos" },
  },
  {
    path: "medico/:id",
    component: MedicoComponent,
    data: { titulo: "Actualizar Medico" },
  },
  {
    path: "busqueda/:termino",
    component: BusquedaComponent,
    data: { titulo: "Buscador" },
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
