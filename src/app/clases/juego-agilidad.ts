import { Juego } from '../clases/juego'

export class JuegoAgilidad extends Juego {

	primerNumero:number;
	segundoNumero:number;
	arrayOperandos:Array<string> = ["+","-","*","/"];
	operando:string;
	eleccionUsuario:number;
 	solucion:number;

 	constructor() {

 		super();

  	}

	cargarSolucion() : void {

		this.operando = this.arrayOperandos[ Math.floor( ( Math.random() * this.arrayOperandos.length ) ) ];
		this.primerNumero = Math.floor((Math.random() * 200) + 1);
		this.segundoNumero = Math.floor((Math.random() * 200) + 1);
		switch(this.operando){
			case "+":
				this.solucion = this.primerNumero + this.segundoNumero;
				break;
			case "-":
				this.solucion = this.primerNumero - this.segundoNumero;
				break;
			case "*":
				this.solucion = this.primerNumero * this.segundoNumero;
				break;
			case "/":
				while(this.segundoNumero === 0){
					this.segundoNumero = Math.floor((Math.random() * 200) + 1);
				}
				this.solucion = Math.floor(this.primerNumero / this.segundoNumero);
				break;
		}

	}
 
	verificar(): boolean{

		if (this.eleccionUsuario === this.solucion)
			return true;
		else 
			return false;

	}

}
