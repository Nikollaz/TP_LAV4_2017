import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';

import { Jugador } from '../../clases/jugador';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {
  
  public jugadores: Array<Jugador>;

  public showTable: boolean = false;
  
  miJugadoresServicio:JugadoresService;
  
  constructor(private http: HttpClient, serviceJugadores:JugadoresService) {

    this.jugadores = new Array<Jugador>();
    
  }
    
  ngOnInit() {
  }

  TraerTodos(){

    this.jugadores = new Array<Jugador>();

    var headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'SessionToken' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQwOTYyOTcsImRhdGEiOnsiZW1haWwiOiJ0ZXN0MDEiLCJwZXJmaWwiOiJhZG1pbiJ9fQ.AI1nLwQeCo6Jk2w8YVr6YWcpX_dHJRNWj8Iv2ZAWtV4'
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
