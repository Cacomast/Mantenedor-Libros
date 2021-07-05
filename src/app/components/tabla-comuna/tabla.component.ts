import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tabla } from '../../interfaces/comuna';
import { Comuna } from '../../interfaces/comuna';

@Component({
  selector: 'app-tabla-comuna',
  templateUrl: './tabla.component.html',
  styles: [
  ]
})

export class TablaComponent {

  @Input('tabla') tabla:Tabla = {
    title:'Default',
    headers:[],
    values:[],
    button:'Button',
    regiones:[]
  };

  @Output('returnUpdate') returnValueUpdate: EventEmitter<Comuna> = new EventEmitter();
  @Output('returnDelete') returnValueDelete: EventEmitter<Comuna> = new EventEmitter();

  getRowDelete(comuna: Comuna){
    console.log(comuna);
    this.returnValueDelete.emit(comuna);
  }

  getRowUpdate(comuna: Comuna){
    console.log(comuna);
    this.returnValueUpdate.emit(comuna);
  }

}
