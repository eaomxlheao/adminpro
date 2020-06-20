import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICIOS } from "../config/config";

@Pipe({
  name: "imagen",
})
export class ImagenPipe implements PipeTransform {
  transform(imagen: string, tipo: string): any {
    let url = URL_SERVICIOS + "/imagen";
    if (!imagen) {
      return url + "/usuarios/xxx.jpg";
    }

    if (imagen.indexOf("https") >= 0) {
      return imagen;
    }

    switch (tipo) {
      case "usuario":
        url += "/usuarios/" + imagen;
        break;
      case "medico":
        url += "/medicos/" + imagen;
        break;
      case "hospital":
        url += "/hospitales/" + imagen;
        break;
      default:
        url += "/usuarios/xxx.jpg";
        break;
    }
    return url;
  }
}
