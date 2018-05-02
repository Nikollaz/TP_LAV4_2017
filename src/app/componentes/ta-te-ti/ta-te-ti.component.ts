import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tateti } from '../../clases/tateti'; 

import { Observable } from 'rxjs/Observable';

import "rxjs/add/observable/interval";

import { Subscription } from 'rxjs/Subscription';

import * as myGlobals from '../../clases/constantes';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.css']
})
export class TaTeTiComponent implements OnInit {

	private tateti:Tateti;

	constructor( public router: Router ) {

		this.tateti = new Tateti();

	}

	ngOnInit() {

		this.tateti = new Tateti();

		var parent = this;

		for (var i = 0; i < 9; i++) { 

			$('#cell-'+i).on('click', function(e){

				$( this  ).val("X");

				for (var i = 0; i < 9; i++) { 

					$('#cell-'+i).prop('disabled', true);

				}

				if( parent.validarGanador() === null){

					if( parent.tateti.validarGridCompleta() === true ){

						alert("Fue un empate!");

					} else {

						parent.turnoMaquina();

					} 

				}

			});

		}

	}

	NuevoJuego(){

		this.tateti = new Tateti();

		for (var i = 0; i < 9; i++) { 
			$('#cell-'+i).val("");
		}

		if ( localStorage.getItem("usuarioLogeado") === null || localStorage.getItem("usuarioLogeado") === "") {

			$('#modalNotLogged').modal('show');

		} else {

			$("#nuevoJuego").prop('disabled', true);

			for (var i = 0; i < 9; i++) { 
				$("#cell-"+i).prop('disabled', false);
			}

			this.turnoMaquina();

		}

	}

	private loguearse(){
		$('#modalNotLogged').modal('hide');
		this.router.navigate(["/Login"]);
	}

	private registrarse(){
		$('#modalNotLogged').modal('hide');
		this.router.navigate(["/Registro"]);
	}

	private getGridActual(): Array<string>{

		let gridActual: Array<string> = ["","","","","","","","",""];

		gridActual.forEach(function(element,index) {
			
			gridActual[index] = <string> $( "#cell-" + index.toString() ).val();

		});

		return gridActual;
	}

	private turnoMaquina(){

		$("#turno").html("Turno maquina");

		let eleccion:number = Math.floor((Math.random() * 9));
		let valorGrid:string = <string> $( "#cell-" + eleccion.toString() ).val();

		while( valorGrid !== "" ){

			eleccion = Math.floor((Math.random() * 9));
			valorGrid = <string> $( "#cell-" + eleccion.toString() ).val();

		}

		$( "#cell-" + eleccion.toString() ).val("O");
		$( "#cell-" + eleccion.toString() ).prop('disabled', true);

		this.tateti.gridActual = this.getGridActual();

		if( this.validarGanador() === null){

			if( this.tateti.validarGridCompleta() === true ){

				this.enviarResultado("Empato");

			} else {

				this.turnoJugador();

			} 

		}

	}

	private turnoJugador(){

		for (var i = 0; i < 9; i++) { 
			if( $('#cell-'+i).val() === "")
				$('#cell-'+i).prop('disabled', false);
		}

		$("#turno").html("Turno jugador");

	}

	private validarGanador(): boolean{

		this.tateti.gridActual = this.getGridActual();
		if( this.tateti.verificar() === true ){
			this.enviarResultado("Gano");
			return true;
		} else if( this.tateti.verificar() === false ){
			this.enviarResultado("Perdio");
			return false;
		} else {
			return null;
		}

	}

	private enviarResultado(resultado:string){

		let titulo:string;
		let mensaje: string;
		let apiResultado: string;

		if(resultado === "Gano"){
			titulo = "Felicidades!";
			mensaje = "Gano contra la maquina!";
			apiResultado = "Gano";
		}
		if(resultado === "Perdio"){
			titulo = "Lastima!";
			mensaje = "Perdio contra la maquina!";
			apiResultado = "Perdio";
		}
		if(resultado === "Empato"){
			titulo = "Casi!";
			mensaje = "Empato contra la maquina!";
			apiResultado = "Empato";
		}

		/* === API REST === */
		
		let juego:string = "Tateti";
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

			if(titulo==="Felicidades!"){
				$('#myModalLabelImg').html("<img style='max-width: 15%; margin-top: 4%;' src='../../assets/imagenes/gano.png'></img>");
				$('#customModalHeader').css({
					"color": "white",
					"background-color": "green" 
				});
			}

			if(titulo==="Lastima!"){
				$('#myModalLabelImg').html("<img style='max-width: 15%; margin-top: 4%;' src='../../assets/imagenes/perdio.png'></img>");
				$('#customModalHeader').css({
					"color": "white",
					"background-color": "red" 
				});
			}

			if(titulo==="Casi!"){
				$('#myModalLabelImg').html("<img style='max-width: 15%; margin-top: 4%;' src='../../assets/imagenes/empato.png'></img>");
				$('#customModalHeader').css({
					"color": "white",
					"background-color": "gray" 
				});
			}

			$('#myModalLabelHeader').html(titulo);
			$('#myModalLabelBody').html(mensaje);
			$('#modalFelicidadesLogged').modal('show');

			$("#nuevoJuego").prop('disabled', false);
			
			localStorage.removeItem("success");
		      
		}

	}

}