import { Component, OnInit } from '@angular/core';
import { Sudoku } from '../../clases/sudoku'; 
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import "rxjs/add/observable/interval";

import { Subscription } from 'rxjs/Subscription';

import * as myGlobals from '../../clases/constantes';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

  private sudoku:Sudoku;
  private reintentos: number;

  private segundosFinales: number;
  private reintentosFinales: number;

  counter: Observable<number>;
  subscribedCounter: number;
  private _subscription:Subscription

  constructor( public router: Router ) {

    this.sudoku = new Sudoku();
    this.reintentos = 0;

    this.segundosFinales = 0;
    this.reintentosFinales = 0;

  }

  ngOnInit() {

  }

  NuevoJuego(){

    if ( localStorage.getItem("usuarioLogeado") === null || localStorage.getItem("usuarioLogeado") === "") {

      $('#modalNotLogged').modal('show');

    } else {

      this.counter = Observable.interval(1000);
      this._subscription = this.counter.subscribe(
        v => { this.subscribedCounter = v; }
      );

      this.sudoku = new Sudoku();
      this.reintentos = 0;

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

  }

  Validar(){

    ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = true;

  	let gano:boolean = this.sudoku.verificar();

  	if( gano === true ){

      this.segundosFinales = this.subscribedCounter;
      this.reintentosFinales = this.reintentos;

      let juego:string = "Sudoku";
      let jugador:string = <string>localStorage.getItem("usuarioLogeado");
      let Data:string = JSON.stringify({

        "Tiempo": this.subscribedCounter,
        "Reintentos": this.reintentos

      }); // {"Tiempo":230,"Reintentos":5}

      let datos:string = "Juego=" + juego + "&Jugador=" + jugador + "&Data=" + Data;

      $.ajax({
        type: "POST",
        url: myGlobals.SERVER + "/partidas",
        data: datos,
        dataType: "text",
        async: false,
        beforeSend: function() {

          $("#carga").html(myGlobals.LOADING_GIF);

        },
        success: function(response) {

          if( JSON.parse(response).hasOwnProperty('Estado') && JSON.parse(response).Estado === "Error"){

            $("#myModalLabel").css("visibility", "hidden");
            $("#userErrorTitle").css("visibility", "visible");
            $("#userErrorBody").css("visibility", "visible");

          } else {

            $('#modalFelicidadesLogged').modal('show');

          }

          $("#carga").html("");
          localStorage.setItem("success", "1");

        }

      });

      if( localStorage.getItem("success") === "1"){

        this.counter = null;
        this.subscribedCounter = null;
        this._subscription.unsubscribe();
        this.reintentos = 0;
        localStorage.removeItem("success");
              
      }

  	} else {

  		$('#modalFalta').modal('show');

      this.reintentos++;

      ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

  	}

  }

  test(){

    this.sudoku.solution.forEach(function(any,index){

    	( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).value = String( any );
    	( <HTMLInputElement> document.getElementById("cell-" + String(index) ) ).disabled = true;

    });

    ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

  }

  loguearse(){
    $('#modalNotLogged').modal('hide');
    this.router.navigate(["/Login"]);
  }

  registrarse(){
    $('#modalNotLogged').modal('hide');
    this.router.navigate(["/Registro"]);
  }

}
