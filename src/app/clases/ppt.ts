import { Juego } from '../clases/juego'

export class Ppt extends Juego {

	posibilitades:Array<string> = ["Piedra","Papel","Tijera"];
	eleccionJugador:string;
	eleccionMaquina:string;

 	constructor() {

 		super();

  	}

  	private elegirMaquina() {

  		this.eleccionMaquina = this.posibilitades[Math.floor((Math.random() * 3))];

  	}

  	verificar(): boolean {

  		this.elegirMaquina();

  		let jugador:string = this.eleccionJugador;
  		let maquina:string = this.eleccionMaquina;
  		let gano:boolean;

  		if
  			(
  				jugador === "Piedra" && maquina === "Piedra" || 
  				jugador === "Papel" && maquina === "Papel" || 
  				jugador === "Tijera" && maquina === "Tijera"
  			){

  			gano = null;

  		} else 
  		if 
  			(
  				jugador === "Piedra" && maquina === "Tijera" || 
  				jugador === "Papel" && maquina === "Piedra" || 
  				jugador === "Tijera" && maquina === "Papel"
  			){

  			gano = true;

  		} else 
  		if 
  			(
  				jugador === "Tijera" && maquina === "Piedra" || 
  				jugador === "Piedra" && maquina === "Papel" || 
  				jugador === "Papel" && maquina === "Tijera"
  			){

  			gano = false;

  		}

  		return gano;

  	}

}
