import { Component, OnInit } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import "rxjs/add/observable/interval";

import * as myGlobals from '../../clases/constantes';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  private JuegoAgilidad:JuegoAgilidad;
  private reintentos: number;

  private segundosFinales: number;
  private reintentosFinales: number;

  counter: Observable<number>;
  counterRestante: number;
  subscribedCounter: number;
  private _subscription:Subscription

  constructor( public router: Router ) {

    this.JuegoAgilidad = new JuegoAgilidad();
    this.reintentos = 0;

    this.segundosFinales = 0;
    this.reintentosFinales = 0;

  }

  ngOnInit() {

    this.JuegoAgilidad = new JuegoAgilidad();

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

      ( <HTMLInputElement> document.getElementById("eleccionUsuarioInput") ).disabled = false;

      this.JuegoAgilidad = new JuegoAgilidad();
      this.reintentos = 0;

      this.counter = Observable.interval(1000);
      this._subscription = this.counter.subscribe(
        v => { 
          this.subscribedCounter = v;
          
          if(this.subscribedCounter === 25){

            $('#modalPerdio').modal('show');
            this.terminar();

          }
        }
      );

      this.JuegoAgilidad.cargarSolucion();
      
      $("#primerNumero").html(this.JuegoAgilidad.primerNumero.toString());
      $("#operando").html(this.JuegoAgilidad.operando);
      $("#segundoNumero").html(this.JuegoAgilidad.segundoNumero.toString());
      $("#palabra").css("visibility", "visible");
      $("#eleccionUsuario").css("visibility", "visible");

      ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

    }

  }

  Validar(){
    
    ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = true;

    let gano:boolean = this.JuegoAgilidad.verificar();

    if ( gano ) {
      
      this.segundosFinales = this.subscribedCounter;
      this.reintentosFinales = this.reintentos;

      let juego:string = "Agilidad";
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

        this.terminar();
            
      }

    } else {

      $('#modalFalta').modal('show');

      this.reintentos++;

      ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = false;

    }
    
  }

  terminar(){
    this.counter = null;
    this.subscribedCounter = null;
    this._subscription.unsubscribe();
    this.reintentos = 0;
    localStorage.removeItem("success");
    ( <HTMLInputElement> document.getElementById("validarJuego") ).disabled = true;
    ( <HTMLInputElement> document.getElementById("eleccionUsuarioInput") ).disabled = true;
  }

   /*@Output() 
  }
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  private subscription: Subscription;
  ngOnInit() {
  }
   constructor() {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");  
  }
  NuevoJuego() {
    this.ocultarVerificar=false;
   this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=5;
      }
      }, 900);

  }
  verificar()
  {
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
   

   
  }  
*/
}
