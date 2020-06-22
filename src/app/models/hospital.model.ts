import { Usuario } from "./usuario.model";
export class Hospital {
  constructor(
    public nombre: string,
    public imagen?: string,
    public _id?: string,
    public usuario?: Usuario
  ) {}
}
