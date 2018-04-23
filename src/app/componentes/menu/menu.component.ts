import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogeado: string;

  constructor(private route: ActivatedRoute, private router: Router) { 

    if( localStorage.getItem("usuarioLogeado") === null ){

      $("#logeado").css("display", "none");
      $("#noLogeado").css("display", "inline-block");

    } else {

      this.usuarioLogeado = localStorage.getItem("usuarioLogeado");

      $("#logeado").css("display", "inline-block");
      $("#noLogeado").css("display", "none");

    }


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

  }

  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
          this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'AgilidadaMasListado':
          this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
      case 'Anagrama':
          this.router.navigate(['/Juegos/Anagrama']);
      break;
      case 'Sudoku':
          this.router.navigate(['/Juegos/Sudoku']);
      break;
      case 'Tateti':
          this.router.navigate(['/Juegos/Tateti']);
      break;
      case 'PPT':
          this.router.navigate(['/Juegos/PPT']);
      break;
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
