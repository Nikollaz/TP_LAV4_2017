import { Component, OnInit, Injectable } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Juego } from '../../clases/juego';
import { Partida } from '../../clases/partida';

import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

import * as myGlobals from '../../clases/constantes';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})

@Injectable()
export class MisDatosComponent implements OnInit {

  public listado: Array<Partida>;

  miServicioJuego:JuegoServiceService
  
  constructor(private http: HttpClient, servicioJuego:JuegoServiceService, private route: ActivatedRoute, private router: Router) {

  	this.listado = new Array<Partida>();

    this.miServicioJuego = servicioJuego;
    
  }
  
  ngOnInit() {
    
    this.llamaService();
    
  }

  private llamaService(){

    this.listado = new Array<Partida>();
    let juegos:Array<Juego> = new Array<Juego>();
    let partidas:Array<Partida> = new Array<Partida>();

    var datos = "usuario=" + localStorage.getItem("usuarioLogeado");

    $.ajax({
	    type: "POST",
	    url: myGlobals.SERVER + "/partidas/misDatos",
	    data: datos,
	    dataType: "text",
	    async: false,
	    beforeSend: function(request) {

	        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	    },
	    success: function(response) {

			juegos = <Array<Juego>> JSON.parse(response);
			partidas = <Array<Partida>> JSON.parse(response);

			juegos.forEach(function(a, index){

				partidas[index].Juego = juegos[index].Juego;
				partidas[index].Jugador = juegos[index].Jugador;
				partidas[index].Data = JSON.parse( juegos[index].Data );

			});
	        
	    }

    });

    this.listado = partidas;

  }

  desloguearse(){

    localStorage.removeItem("usuarioLogeado");
    if(this.router.url === "/")
      this.router.navigate(["/Principal"]);
    else
      this.router.navigate(["/"]);
    
  }
  /*
  llamaServicePromesa(){

    console.log("llamaServicePromesa");
    this.miServicioJuego.listarPromesa().then((listado) => {
        this.listadoParaCompartir = listado;
    });

  }
  */

}
