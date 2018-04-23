import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Jugador } from '../../clases/jugador';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  usuarioLogeado: string;
  
  public jugadores: Array<Jugador>;

  public showTable: boolean = false;
  
  miJugadoresServicio:JugadoresService;
  
  constructor(private http: HttpClient, serviceJugadores:JugadoresService, private route: ActivatedRoute, private router: Router) {

    if( localStorage.getItem("usuarioLogeado") === null ){

      $("#logeado").css("display", "none");
      $("#noLogeado").css("display", "inline-block");

    } else {

      this.usuarioLogeado = localStorage.getItem("usuarioLogeado");

      $("#logeado").css("display", "inline-block");
      $("#noLogeado").css("display", "none");

    }

    this.jugadores = new Array<Jugador>();
    
  }
    
  ngOnInit() {

    if( localStorage.getItem("usuarioLogeado") === null ){

      $("#logeado").css("display", "none");
      $("#noLogeado").css("display", "inline-block");

    } else {

      this.usuarioLogeado = localStorage.getItem("usuarioLogeado");

      $("#logeado").css("display", "inline-block");
      $("#noLogeado").css("display", "none");

    }

    this.TraerTodos();

  }

  TraerTodos(){

    this.jugadores = new Array<Jugador>();

    var headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded'/*,
      'SessionToken' : localStorage.getItem("SessionToken")*/
    });
    this.http.get('http://www.njsr27.com/API/empleados', {
      headers: headers
    })
    .subscribe(data => {

      this.jugadores = <Array<Jugador>> data;

      this.showTable = true;

    }, error => {

        console.log(error);

    });

    //alert("totos");
    /*this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })*/
  }

  desloguearse(){

    localStorage.removeItem("usuarioLogeado");
    if(this.router.url === "/")
      this.router.navigate(["/Principal"]);
    else
      this.router.navigate(["/"]);
    
  }
  
  /*
  TraerGanadores(){
    this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
  TraerPerdedores(){
    this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
  */
}
