import { Juego } from '../clases/juego'

export class Tateti extends Juego {

	gridActual:Array<string>;

 	constructor() {

 		super();

 		this.gridActual = ["","","","","","","","",""];

  	}

  	validarGridCompleta(){

  		if(
  			this.gridActual[0] !== "" && this.gridActual[1] !== "" && this.gridActual[2] !== "" &&
  			this.gridActual[3] !== "" && this.gridActual[4] !== "" && this.gridActual[5] !== "" &&
  			this.gridActual[6] !== "" && this.gridActual[7] !== "" && this.gridActual[8] !== ""

  		){
  			return true;
  		} else {
  			return false;
  		}

  	}

  	verificar(): boolean {

  		if(

  			(this.gridActual[0] === "X" && this.gridActual[1] === "X" && this.gridActual[2] === "X") ||
  			(this.gridActual[3] === "X" && this.gridActual[4] === "X" && this.gridActual[5] === "X") ||
  			(this.gridActual[6] === "X" && this.gridActual[7] === "X" && this.gridActual[8] === "X") ||

  			(this.gridActual[0] === "X" && this.gridActual[3] === "X" && this.gridActual[6] === "X") ||
  			(this.gridActual[1] === "X" && this.gridActual[4] === "X" && this.gridActual[7] === "X") ||
  			(this.gridActual[2] === "X" && this.gridActual[5] === "X" && this.gridActual[8] === "X") ||

  			(this.gridActual[0] === "X" && this.gridActual[4] === "X" && this.gridActual[8] === "X") ||
  			(this.gridActual[6] === "X" && this.gridActual[4] === "X" && this.gridActual[2] === "X")

  		){
  			return true;
  		} else if(

  			(this.gridActual[0] === "O" && this.gridActual[1] === "O" && this.gridActual[2] === "O") ||
  			(this.gridActual[3] === "O" && this.gridActual[4] === "O" && this.gridActual[5] === "O") ||
  			(this.gridActual[6] === "O" && this.gridActual[7] === "O" && this.gridActual[8] === "O") ||

  			(this.gridActual[0] === "O" && this.gridActual[3] === "O" && this.gridActual[6] === "O") ||
  			(this.gridActual[1] === "O" && this.gridActual[4] === "O" && this.gridActual[7] === "O") ||
  			(this.gridActual[2] === "O" && this.gridActual[5] === "O" && this.gridActual[8] === "O") ||

  			(this.gridActual[0] === "O" && this.gridActual[4] === "O" && this.gridActual[8] === "O") ||
  			(this.gridActual[6] === "O" && this.gridActual[4] === "O" && this.gridActual[2] === "O")

  		){
  			return false;
  		} else {
  			return null;
  		}

  	}

}
