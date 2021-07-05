import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tabla } from '../../interfaces/sucursal';
import { Sucursal } from '../../interfaces/sucursal';


@Component({
  selector: 'app-tabla-sucursal',
  templateUrl: './tabla-sucursal.component.html',
  styles: [
  ]
})
export class TablaSucursalComponent {

  @Input('tabla') tabla:Tabla = {
    title:'Default',
    headers:[],
    values:[],
    button:'Button',
    comunas:[]
  };

  @Output('returnUpdate') returnValueUpdate: EventEmitter<Sucursal> = new EventEmitter();
  @Output('returnDelete') returnValueDelete: EventEmitter<Sucursal> = new EventEmitter();

  getRowDelete(sucursal: Sucursal){
    console.log(sucursal);
    this.returnValueDelete.emit(sucursal);
  }

  getRowUpdate(sucursal: Sucursal){
    console.log(sucursal);
    this.returnValueUpdate.emit(sucursal);
  }

}
