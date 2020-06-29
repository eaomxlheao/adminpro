import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UsuarioService } from "../services/usuario/usuario.service";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(public usuarioService: UsuarioService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.usuarioService.token) {
      const headers = new HttpHeaders({ Token: this.usuarioService.token });
      const tempRequest = req.clone({
        headers,
      });

      return next.handle(tempRequest);
    } else {
      return next.handle(req);
    }
  }
}
