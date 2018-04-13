import { Component, OnInit } from '@angular/core';
import { Sudoku } from '../../clases/sudoku'; 

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

  private sudoku:Sudoku;

  constructor() {

    this.sudoku = new Sudoku();

  }

  ngOnInit() {

  }

  NuevoJuego(){

    this.sudoku = new Sudoku();

  	let i:any = 0;

  	this.sudoku.cargarSolucion();

  	this.sudoku.solution.forEach(function(any,index){

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

  	this.sudoku.solution.forEach(function(any,index){

  		gridValues.push( Number( ( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).value ) )

  	});

  	if( ( JSON.stringify(gridValues) === JSON.stringify(this.sudoku.solution) ) === true){

  		$('#modalFelicidades').modal('show');

  	} else {

  		$('#modalFalta').modal('show');

  	}

  }

  test(){

    this.sudoku.solution.forEach(function(any,index){

    	( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).value = String( any );
    	( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).disabled = true;

    });

    ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

  }

}
