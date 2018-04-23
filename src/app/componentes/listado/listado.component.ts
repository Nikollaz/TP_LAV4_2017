import { Component, OnInit, Injectable } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Juego } from '../../clases/juego';
import { Partida } from '../../clases/partida';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

@Injectable()
export class ListadoComponent implements OnInit {

  usuarioLogeado: string;

  public listadoParaCompartir : Array<Partida>;

  miServicioJuego:JuegoServiceService
  
  constructor(private http: HttpClient, servicioJuego:JuegoServiceService, private route: ActivatedRoute, private router: Router) {

    if( localStorage.getItem("usuarioLogeado") === null ){

      $("#logeado").css("display", "none");
      $("#noLogeado").css("display", "inline-block");

    } else {

      this.usuarioLogeado = localStorage.getItem("usuarioLogeado");

      $("#logeado").css("display", "inline-block");
      $("#noLogeado").css("display", "none");

    }

    this.miServicioJuego = servicioJuego;

    this.listadoParaCompartir = new Array<Partida>();
    
    
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
    
    this.llamaService();
    
  }

  llamaService(){

    this.listadoParaCompartir = new Array<Partida>();

    var headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded'/*,
      'SessionToken' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQwOTYyOTcsImRhdGEiOnsiZW1haWwiOiJ0ZXN0MDEiLCJwZXJmaWwiOiJhZG1pbiJ9fQ.AI1nLwQeCo6Jk2w8YVr6YWcpX_dHJRNWj8Iv2ZAWtV4'*/
    });
    this.http.get('http://www.njsr27.com/API/partidas', {
      headers: headers
    })
    .subscribe(data => {

      let juegos:Array<Juego> = <Array<Juego>> data;
      let partidas:Array<Partida> = <Array<Partida>> data;
      
      juegos.forEach(function(a, index){

        partidas[index].Juego = juegos[index].Juego;
        partidas[index].Jugador = juegos[index].Jugador;
        partidas[index].Data = JSON.parse( juegos[index].Data );

      });

      this.listadoParaCompartir = partidas;

    }, error => {

        console.log(error);

    });

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
