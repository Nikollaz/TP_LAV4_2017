import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

import * as myGlobals from '../../clases/constantes';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    miServicioLogin:LoginService;

    constructor( private router: Router, servicioLogin:LoginService ) {

        this.miServicioLogin = servicioLogin;

        if (this.getCookie("email") !== "" && this.getCookie("password") !== "") {

            $("#email").val(this.getCookie("email"));
            $("#password").val(this.getCookie("password"));

        }

    }

    ngOnInit() {

        if (this.getCookie("email") !== "" && this.getCookie("password") !== "") {

            $("#email").val(this.getCookie("email"));
            $("#password").val(this.getCookie("password"));

        }

    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while ( c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if ( c.indexOf(name) === 0 ) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    } 

    login() {

        $("#email").css("border-color", "");
        $("#password").css("border-color", "");
        $("#emailError").css("visibility", "hidden");
        $("#passwordError").css("visibility", "hidden"); 
        $("#userError").css("visibility", "hidden");

        var email = $("#email").val();
        var password = $("#password").val();

        if (email !== "" && password !== "") {

            if ($("#recordarme").is(':checked')) {

                document.cookie = "email=" + email + ";";
                document.cookie = "password=" + password + ";";

            }

            var datos = "email=" + email + "&password=" + password;

            $("#carga").html(myGlobals.LOADING_GIF);

            this.miServicioLogin.nuevo(datos, 'application/x-www-form-urlencoded')
            .then( response => {

                if( response.hasOwnProperty('Estado') && response.Estado === "Error"){

                  $("#userError").css("visibility", "visible");

                } else {

                  var SessionToken = response.SessionToken;

                  localStorage.setItem("SessionToken", SessionToken);
                  myGlobals.setActiveProfile( response.perfil );
                  localStorage.setItem("perfil", myGlobals.ACTIVE_PROFILE);
                  localStorage.setItem("usuarioLogeado", <string>email);

                  this.router.navigate(["/Principal"]); 

                }

                $("#carga").html("");

            });
            
        }

        if ($("#email").val() === "") { 

          $("#email").css("border-color", "red");
          $("#emailError").css("visibility", "visible");
            
        }

        if ($("#password").val() === "") {
          $("#password").css("border-color", "red");
          $("#passwordError").css("visibility", "visible");  
        }

    }

    cancelar(){

        this.router.navigate(["/Principal"]);

    }

}
    /*
    private subscription: Subscription;
    usuario = '';
    clave= '';
    progreso: number;
    progresoMensaje="esperando..."; 
    logeando=true;
    ProgresoDeAncho:string;

    clase="progress-bar progress-bar-info progress-bar-striped ";

    constructor(
      private route: ActivatedRoute,
      private router: Router) {
        this.progreso=0;
        this.ProgresoDeAncho="0%";

    }
  
    ngOnInit() {
    }
  
    Entrar() {
      if (this.usuario === 'admin' && this.clave === 'admin') {
        this.router.navigate(['/Principal']);
      }
    }
    MoverBarraDeProgreso() {
      
      this.logeando=false;
      this.clase="progress-bar progress-bar-danger progress-bar-striped active";
      this.progresoMensaje="NSA spy..."; 
      let timer = TimerObservable.create(200, 50);
      this.subscription = timer.subscribe(t => {
        console.log("inicio");
        this.progreso=this.progreso+1;
        this.ProgresoDeAncho=this.progreso+20+"%";
        switch (this.progreso) {
          case 15:
          this.clase="progress-bar progress-bar-warning progress-bar-striped active";
          this.progresoMensaje="Verificando ADN..."; 
            break;
          case 30:
            this.clase="progress-bar progress-bar-Info progress-bar-striped active";
            this.progresoMensaje="Adjustando encriptación.."; 
            break;
            case 60:
            this.clase="progress-bar progress-bar-success progress-bar-striped active";
            this.progresoMensaje="Recompilando Info del dispositivo..";
            break;
            case 75:
            this.clase="progress-bar progress-bar-success progress-bar-striped active";
            this.progresoMensaje="Recompilando claves facebook, gmail, chats..";
            break;
            case 85:
            this.clase="progress-bar progress-bar-success progress-bar-striped active";
            this.progresoMensaje="Instalando KeyLogger..";
            break;
            
          case 100:
            console.log("final");
            this.subscription.unsubscribe();
            this.Entrar();
            break;
        }     
      });
      //this.logeando=true;
    }*/
