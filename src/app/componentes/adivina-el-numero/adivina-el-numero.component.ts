import { Component, OnInit } from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina'

import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import "rxjs/add/observable/interval";

import { Subscription } from 'rxjs/Subscription';

import * as myGlobals from '../../clases/constantes';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {

  private juegoAdivina:JuegoAdivina;
  private reintentos: number;

  private segundosFinales: number;
  private reintentosFinales: number;

  counter: Observable<number>;
  subscribedCounter: number;
  private _subscription:Subscription

  constructor( public router: Router ) {

    this.juegoAdivina = new JuegoAdivina();
    this.reintentos = 0;

    this.segundosFinales = 0;
    this.reintentosFinales = 0;

  }

  ngOnInit() {

    this.juegoAdivina = new JuegoAdivina();

    // Execute a function when the user releases a key on the keyboard
    document.getElementById("eleccionUsuario").addEventListener("keyup", function(event) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("validarJuego").click();
      }
    });

  }


  NuevoJuego(){

      if ( localStorage.getItem("usuarioLogeado") === null || localStorage.getItem("usuarioLogeado") === "") {

      $('#modalNotLogged').modal('show');

    } else {

      this.juegoAdivina = new JuegoAdivina();
      this.reintentos = 0;

      this.counter = Observable.interval(1000);
      this._subscription = this.counter.subscribe(
        v => { this.subscribedCounter = v; }
      );

      this.juegoAdivina.cargarSolucion();
      
      $("#palabraEnJuego").html(this.juegoAdivina.numeroSignos);
      $("#palabra").css("visibility", "visible");
      $("#eleccionUsuario").css("visibility", "visible");

      ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

    }

  }

  Validar(){

    ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = true;

    let gano:boolean = this.juegoAdivina.verificar();

    if ( gano ) {
      
      $("#palabraEnJuego").html( this.juegoAdivina.solucion.toString());

      this.segundosFinales = this.subscribedCounter;
      this.reintentosFinales = this.reintentos;

      let juego:string = "Adivina";
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

    } else if(this.juegoAdivina.eleccionUsuario < this.juegoAdivina.solucion){

      $('#myModalLabelFalta').html('Esta por debajo de la solucion!');
      $('#modalFalta').modal('show');

      this.reintentos++;

      ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

    } else if(this.juegoAdivina.eleccionUsuario > this.juegoAdivina.solucion){

      $('#myModalLabelFalta').html('Esta por encima de la solucion!');
      $('#modalFalta').modal('show');

      this.reintentos++;

      ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

    }

  }



}
