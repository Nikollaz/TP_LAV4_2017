import { Juego } from '../clases/juego'

export class JuegoAdivina extends  Juego {

  eleccionUsuario:number;
  solucion:number;
  numeroSignos:string;

  constructor() {

    super();

  }

  cargarSolucion() : void {

    this.solucion = Math.floor((Math.random() * 200) + 1);
    this.numeroSignos = (this.solucion.toString()).replace( /[0-9]/g , "?");

  }
 
  verificar(): boolean {

    if (this.eleccionUsuario === this.solucion)
      return true;
    else 
      return false;

  }

}
