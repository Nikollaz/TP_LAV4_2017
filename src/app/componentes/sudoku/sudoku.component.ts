import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

  solution:Array<any>;
  numeroSolucion:any;

  constructor() { 

  }

  ngOnInit() {

  }

  NuevoJuego(){

  	this.solution = new Array<any>();

  	let i:any = 0;

  	this.solution = this.cargarSolucion();

  	this.solution.forEach(function(any,index){

  		( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).value = String( any );
  		( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).disabled = true;

  	});

	for (i= 0; i < 40; i++) {

		let hiddenValue:any = Math.floor((Math.random() * 80));

  		( <HTMLInputElement> document.getElementById("cell-" + String(hiddenValue) ) ).value = "";
  		( <HTMLInputElement> document.getElementById("cell-" + String(hiddenValue) ) ).disabled = false;
	   
	}

	( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

  }

  Validar(){

  	let i:any = 0;

  	let gridValues = new Array<any>();

  	this.solution.forEach(function(any,index){

  		gridValues.push( Number( ( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).value ) )

  	});

  	if( ( JSON.stringify(gridValues) === JSON.stringify(this.solution) ) === true){
  		$('#modalFelicidades').modal('show');
  	} else {
  		//alert("Todavia falta, sigue intentando!");
  		$('#modalFalta').modal('show');
  	}

  }

  test(){

	this.solution.forEach(function(any,index){

  		( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).value = String( any );
  		( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).disabled = true;

  	});

  	( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

  }

  private cargarSolucion() : Array<any>{

  	let arraySoluciones:any = new Array<any>();

  	arraySoluciones.push(

  		[  		
  			9,7,1,2,8,6,5,3,4,
  			2,5,3,1,4,9,8,6,7,
  			8,4,6,7,3,5,9,2,1,
  			1,8,7,9,6,4,2,5,3,
  			4,3,5,8,1,2,7,9,6,
  			6,2,9,5,7,3,1,4,8,
  			7,6,2,3,9,1,4,8,5,
  			5,1,4,6,2,8,3,7,9,
  			3,9,8,4,5,7,6,1,2
  		],
  		[
  			3,7,8,1,9,6,4,5,2,
  			9,6,1,2,5,4,7,3,8,
  			2,4,5,3,7,8,1,9,6,
  			7,1,3,8,6,2,9,4,5,
  			4,2,6,9,1,5,3,8,7,
  			5,8,9,4,3,7,6,2,1,
  			1,5,2,7,4,9,8,6,3,
  			8,3,4,6,2,1,5,7,9,
  			6,9,7,5,8,3,2,1,4
  		],
  		[
  			7,9,3,5,8,4,2,6,1,
  			2,4,6,3,1,9,7,8,5,
  			5,1,8,2,6,7,9,3,4,
  			1,2,5,8,3,6,4,9,7,
  			3,8,9,4,7,2,5,1,6,
  			4,6,7,9,5,1,3,2,8,
  			6,3,1,7,9,5,8,4,2,
  			8,5,2,1,4,3,6,7,9,
  			9,7,4,6,2,8,1,5,3
  		]

  	)

  	this.numeroSolucion = Math.floor( ( Math.random() * arraySoluciones.length ) );

  	return arraySoluciones[ this.numeroSolucion ];

  }

}
