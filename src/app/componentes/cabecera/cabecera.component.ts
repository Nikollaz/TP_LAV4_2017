import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

	usuarioLogeado: string;

	constructor(public router: Router) { 

		if( localStorage.getItem("usuarioLogeado") === null ){

			$("#logeado").css("display", "none");
			$("#noLogeado").css("display", "inline-flex");

		} else {

			this.usuarioLogeado = localStorage.getItem("usuarioLogeado");

			$("#logeado").css("display", "inline-flex");
			$("#noLogeado").css("display", "none");

		}

	}

	ngOnInit() {

		if( localStorage.getItem("usuarioLogeado") === null ){

			$("#logeado").css("display", "none");
			$("#noLogeado").css("display", "inline-flex");

		} else {

			this.usuarioLogeado = localStorage.getItem("usuarioLogeado");

			$("#logeado").css("display", "inline-flex");
			$("#noLogeado").css("display", "none");

		}

	}

	desloguearse(){

		localStorage.removeItem("usuarioLogeado");
		if(this.router.url === "/")
			this.router.navigate(["/Principal"]);
		else
			this.router.navigate(["/"]);
		
	}

}
