import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tabla } from '../../interfaces/inventario';
import { Inventario } from '../../interfaces/inventario';
import { Grafico } from '../../interfaces/grafico';

@Component({
  selector: 'app-tabla-inventario',
  templateUrl: './tabla-inventario.component.html',
  styleUrls: []
})

export class TablaInventarioComponent {

  @Input('tabla') tabla:Tabla = {
    title:'Default',
    headers:[],
    values:[],
    button:'Button',
    stockCritico: 0
  };

  @Output('returnUpdate') returnValueUpdate: EventEmitter<Inventario> = new EventEmitter();
  @Output('returnGrafico') returnValueGrafico: EventEmitter<Inventario> = new EventEmitter();

  
  getRowUpdate(inventario: Inventario){
    console.log(inventario);
    this.returnValueUpdate.emit(inventario);
  }

  getRowGrafico(inventario: Inventario){
    console.log(inventario);
    this.returnValueGrafico.emit(inventario);
  }

}
