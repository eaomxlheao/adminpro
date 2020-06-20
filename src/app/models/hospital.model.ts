import { Usuario } from "./usuario.model";
export class Hospital {
  constructor(
    public nombre: string,
    public img?: string,
    public _id?: string,
    public usuario?: Usuario
  ) {}
}
