import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario/inventario.service';
import { ParametroService } from '../../services/parametro/parametro.service';

import { Inventario, InventarioSucursal } from '../../interfaces/inventario';
import { Tabla } from '../../interfaces/inventario';
import { Grafico } from 'src/app/interfaces/grafico';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styles: [
  ]
})
export class InventarioComponent implements OnInit{

  tabla:Tabla = {
    title: 'Inventario',
    headers: ['Id Libro','Isbn','Título','Autor','Cantidad','Estado','Acciones'],
    values:[],
    button:'Nuevo Inventario',
    stockCritico: 0
  }

  grafico:Grafico = {
    title:'Gráfico Prueba',
    labels:['Label1','Label2','Label3'],
    values:[[18,25,68]],
    type:'doughnut'
  }

  inventario:Inventario={
    libroId:0,
    isbn:'',
    titulo:'',
    autor:'',
    stock:0,
    inventario:[]
  }

  inventarioSucursal: InventarioSucursal={
    inventarioId:0,
    libroId:0,
    libro: '',
    sucursalId:0,
    sucursal: '',
    cantidad:0
  }

  values:number[]=[];

  constructor( private service: InventarioService, private serviceParametro: ParametroService) {
  }

  returnInventarioUpdate(inventario: Inventario){
    this.inventario = inventario;
  }

  returnInventarioGrafica(inventario: Inventario){
    console.log('Recibe los datos');
    console.log(inventario);
    this.values = [];
    this.limpiarGrafico();
    this.grafico.title = inventario.titulo;
    inventario.inventario.forEach((item) =>{
      this.grafico.labels.push(item.sucursal);
      this.values.push(item.cantidad);
    });
    this.grafico.values.push(this.values);
  }


  limpiarGrafico(){
    this.grafico ={
      title:'',
      labels:[],
      values:[],
      type:'doughnut'
    }
  }

  ngOnInit(): void {

    this.getParametro();
    this.getInventario();
    console.log(this.tabla);
  }

  getInventario(){
    this.service.getlistaInventario()
    .subscribe((data:any) => {
    this.tabla.values = data;

    this.tabla.values.forEach((item) =>{
      this.service.getInventarioSucursal(item)
      .subscribe((data:any)=>{
        item.inventario = data;
      })
    });
    });
  }

  getParametro(){
    this.serviceParametro.getParametro(2)
    .subscribe((data:any) =>{
      this.tabla.stockCritico = parseInt(data[0].valor);
      console.log('Stock Crítico');
      console.log(data);
      console.log(this.tabla);
    });
  }
}
