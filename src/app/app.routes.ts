import { Routes, RouterModule, Router } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { RegisterComponent } from "./login/register.component";
import { PagesComponent } from "./pages/pages.component";
import { LoginGuard } from "./services/guards/login.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  //Lazi Load
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuard],
    loadChildren: "./pages/pages.module#PagesModule",
  },
  { path: "**", component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
