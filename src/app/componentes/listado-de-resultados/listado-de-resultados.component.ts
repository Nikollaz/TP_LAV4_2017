import { Component, OnInit , Input, EventEmitter} from '@angular/core';

import { Partida } from '../../clases/partida';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 
  @Input()
  public listado: Array<Partida>;

  constructor() {

    this.listado = new Array<Partida>();

  }

  ngOnInit() {

  }
  
  ver() {

    console.info(this.listado);

  }
  
}
