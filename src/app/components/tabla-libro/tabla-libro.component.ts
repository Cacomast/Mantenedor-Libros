import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tabla } from '../../interfaces/libro';
import { Libro } from '../../interfaces/libro';


@Component({
  selector: 'app-tabla-libro',
  templateUrl: './tabla-libro.component.html',
  styles: [
  ]
})

export class TablaLibroComponent {

  @Input('tabla') tabla:Tabla = {
    title:'Default',
    headers:[],
    values:[],
    button:'Button'
  };

  @Output('returnUpdate') returnValueUpdate: EventEmitter<Libro> = new EventEmitter();
  @Output('returnDelete') returnValueDelete: EventEmitter<Libro> = new EventEmitter();

  getRowDelete(libro: Libro){
    console.log(libro);
    this.returnValueDelete.emit(libro);
  }

  getRowUpdate(libro: Libro){
    console.log(libro);
    this.returnValueUpdate.emit(libro);
  }

}

