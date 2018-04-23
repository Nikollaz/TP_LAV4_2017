import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import * as myGlobals from '../../clases/constantes';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  constructor( ) { }

  ngOnInit() {

  }

  registrar() {

    $("#email").css("border-color", "");
    $("#password").css("border-color", "");
    $("#emailError").css("visibility", "hidden");
    $("#passwordError").css("visibility", "hidden"); 
    $("#userError").css("visibility", "hidden");

    var email = $("#email").val();
    var password = $("#password").val();

    if (email !== "" && password !== "") {

        if($("#recordarme").is(':checked')){
            
            document.cookie = "email=" + email + ";";
            document.cookie = "password=" + password + ";";

        }

        var datos = "email=" + email + "&password=" + password;

        $.ajax({
            type: "POST",
            url: myGlobals.SERVER + "/empleados",
            data: datos,
            dataType: "text",
            beforeSend: function() {

                $("#carga").html(myGlobals.LOADING_GIF);

            },
            success: function(response) {

              if( JSON.parse(response).hasOwnProperty('Estado') && JSON.parse(response).Estado === "Error"){

                $("#userError").css("visibility", "visible");

              } else {

                localStorage.setItem("usuarioLogeado", <string>email);

                $("#formContent").css("display", "none");
                $("#signUpSucess").css("display", "inherit");

              }

              $("#carga").html("");

            }
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

}
