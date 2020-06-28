import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from "../usuario/usuario.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class VerificaTokenGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    let token = this.usuarioService.token;
    let payload = JSON.parse(atob(token.split(".")[1]));
    let expirado = this.estaExpirado(payload.exp);
    if (expirado) {
      this.router.navigate(["/login"]);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();
      ahora.setTime(ahora.getTime() + 4 * 60 * 60 * 1000); //4 horas * 60 mins * 60segs * 1000 mili segs
      if (tokenExp.getTime() > ahora.getTime()) {
        //Mas de cuatro horas para que expire
        resolve(true);
      } else {
        this.usuarioService.renuevaToken().subscribe(
          () => {
            resolve(true); //token renovado
          },
          () => {
            this.router.navigate(["/login"]);
            reject(false); //error al renovar token
          }
        );
      }
      resolve(true);
    });
  }

  estaExpirado(fechaExpiracion: number) {
    let ahora = new Date().getTime() / 1000;
    if (fechaExpiracion < ahora) {
      return true;
    } else {
      return false;
    }
  }
}
