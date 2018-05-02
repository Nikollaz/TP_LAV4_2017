import { Juego } from '../clases/juego'

export class Anagrama extends Juego{

	arrayPalabras:Array<string>;
	eleccionUsuario:string;
 	solucion:string;
 	palabraDesordenada:string;

 	constructor() {

 		super();
 		this.arrayPalabras = ["Zambullir",
 		"Perro","Gato","Pato","Lluvia","Ruido","Aleatorio","Curiosidad","Milenario",
 		"Curiosidad","Maravilla","Piedad","Juicio"];

  	}

	cargarSolucion() : void {

		this.solucion = this.arrayPalabras[ Math.floor( ( Math.random() * this.arrayPalabras.length ) ) ];
		this.palabraDesordenada = this.mezclar(this.solucion);

	}
 
	verificar(): boolean{

		if (this.eleccionUsuario === this.solucion)
			return true;
		else 
			return false;

	}

	mezclar(palabra:any): any {

	    var nuevaPalabra  = palabra.split("");
	    var n = nuevaPalabra.length;

	    for(var i = n - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var tmp = nuevaPalabra[i];
	        nuevaPalabra[i] = nuevaPalabra[j];
	        nuevaPalabra[j] = tmp;
	    }

	    return nuevaPalabra.join("");

	}

}
