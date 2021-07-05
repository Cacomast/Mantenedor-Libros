import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tabla } from '../../interfaces/cliente';
import { Cliente } from '../../interfaces/cliente';


@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styles: [
  ]
})
export class TablaClientesComponent {

  @Input('tabla') tabla:Tabla = {
    title:'Default',
    headers:[],
    values:[],
    button:'Button',
    comunas:[]
  };

  @Output('returnUpdate') returnValueUpdate: EventEmitter<Cliente> = new EventEmitter();
  @Output('returnDelete') returnValueDelete: EventEmitter<Cliente> = new EventEmitter();

  getRowDelete(cliente: Cliente){
    console.log(cliente);
    this.returnValueDelete.emit(cliente);
  }

  getRowUpdate(cliente: Cliente){
    console.log(cliente);
    cliente.rutCompleto = cliente.rut + '-' + cliente.dv;
    this.returnValueUpdate.emit(cliente);
  }

}

