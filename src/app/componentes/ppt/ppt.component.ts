import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ppt } from '../../clases/ppt'; 

import { Observable } from 'rxjs/Observable';

import "rxjs/add/observable/interval";

import { Subscription } from 'rxjs/Subscription';

import * as myGlobals from '../../clases/constantes';


@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

	private ppt:Ppt;

	constructor( public router: Router ) {

		this.ppt = new Ppt();

	}

	ngOnInit() {

		this.ppt = new Ppt();

	}

	NuevoJuego(){

		if ( localStorage.getItem("usuarioLogeado") === null || localStorage.getItem("usuarioLogeado") === "") {

			$('#modalNotLogged').modal('show');

		} else {
 			
			$("#eleccionUsuario").css("visibility", "visible");
			$("#eleccionMaquina").css("visibility", "visible");

		}

	}

	juego( eleccion:string ){

		this.ppt.eleccionJugador = eleccion;
		let resultado: boolean = this.ppt.verificar();
		let titulo:string;
		let mensaje: string;
		let apiResultado: string;

		if(resultado === true){
			titulo = "Felicidades!";
			mensaje = "Gano por que la maquina eligio " + this.ppt.eleccionMaquina;
			apiResultado = "Gano";
		}
		if(resultado === false){
			titulo = "Lastima!";
			mensaje = "Perdio por que la maquina eligio " + this.ppt.eleccionMaquina;
			apiResultado = "Perdio";
		}
		if(resultado === null){
			titulo = "Casi!";
			mensaje = "Empato por que la maquina eligio " + this.ppt.eleccionMaquina;
			apiResultado = "Empato";
		}


		/* === API REST === */

		let juego:string = "PPT";
		let jugador:string = <string>localStorage.getItem("usuarioLogeado");
		let Data:string = JSON.stringify({

			"Resultado": apiResultado

		}); // {"Resultado":"Gano"}

		let datos:string = "Juego=" + juego + "&Jugador=" + jugador + "&Data=" + Data;

      	$.ajax({
	        type: "POST",
	        url: myGlobals.SERVER + "/partidas",
	        data: datos,
	        dataType: "text",
	        async: true,
	        beforeSend: function() {

	          $("#carga").html(myGlobals.LOADING_GIF);

	        },
	        success: function(response) {

	          if( JSON.parse(response).hasOwnProperty('Estado') && JSON.parse(response).Estado === "Error"){

	            $("#myModalLabelHeader").css("visibility", "hidden");
	            $("#myModalLabelBody").css("visibility", "hidden");
	            $("#userErrorTitle").css("visibility", "visible");
	            $("#userErrorBody").css("visibility", "visible");

	          } else {

	            localStorage.setItem("success", "1");

	          }

	          $("#carga").html("");

	        }

     	});

      	/* === API REST === */

		if( localStorage.getItem("success") === "1"){

			if( this.ppt.eleccionMaquina === "Tijera" ){
				$("#maquinaTijera").css("visibility", "visible");
			} else if( this.ppt.eleccionMaquina === "Piedra" ){
				$("#maquinaPiedra").css("visibility", "visible");
			} else {
				$("#maquinaPapel").css("visibility", "visible");
			}

			$('#myModalLabelHeader').html(titulo);
			$('#myModalLabelBody').html(mensaje);
			$('#modalFelicidadesLogged').modal('show');

			$('#modalFelicidadesLogged').on('hidden.bs.modal', function () {

				$("#maquinaTijera").css("visibility", "hidden");
				$("#maquinaPiedra").css("visibility", "hidden");
				$("#maquinaPapel").css("visibility", "hidden");

			})
			
			localStorage.removeItem("success");
		      
		}

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
