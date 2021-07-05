import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ComunaService } from 'src/app/services/comuna/comuna.service';
import { InventarioService } from '../../services/inventario/inventario.service';

import { Libros } from 'src/app/interfaces/libroCompra';
import { Cliente } from 'src/app/interfaces/cliente';


import Swal from 'sweetalert2';
import { validate, clean, format, getCheckDigit } from 'rut.js'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [
  ]
})

export class InicioComponent implements OnInit {

  paso:number = 1;
  rut:string = '';

  cliente:Cliente ={
    clienteId: 0,
      rut: 0,
      dv: '',
      rutCompleto:'',
      nombre: '',
      direccion: '',
      telefono: '',
      correo: '',
      password: '',
      valor: '',
      comunaId: 0,
      comuna:'',
      estado: true
  }

  libro:Libros={
    libroId:0,
    isbn:'',
    titulo:'',
    annio:0,
    autor:'',
    editorial:'',
    tapa:'',
    precio:0,
    stock:0,
    inventario:[]
  }

  comunas:any[] = [];

  reserva:boolean = false;
  compra:boolean = false;

  libros:Libros[] = [];

  constructor( private serviceCliente: ClienteService, private serviceInventario: InventarioService, private serviceComuna:ComunaService) { }

  ngOnInit(): void {

    this.getInventario();
    this.getComunas();
    }

    getInventario(){
      this.serviceInventario.getlistaInventario()
      .subscribe((data:any) => {

        this.libros = data;

        console.log("Inventario");
        console.log(this.libros);

          this.libros.forEach((item:any) =>{
             
              this.serviceInventario.getInventarioSucursal(item)
              .subscribe((data:any)=>{            
                item.inventario = data;
              });
          });
          });
          console.log(this.libros); 
    }

    comprarLibro(libro:Libros){
      console.log(libro);
      this.reserva = false;
      this.compra = true;
      this.paso = 2;
      this.getComunas();
    }

    reservarLibro(libro:Libros){
      console.log(libro);
      this.libro = libro;
      this.compra = false;
      this.reserva = true;
      this.paso = 2;
      this.getComunas();
    }

    guardarDatosCliente(forma:NgForm){
      
      if (forma.invalid) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'warning',
          text: 'Complete todos los campos',
          confirmButtonAriaLabel: 'cool'
        });
        return;
      }

      if (!validate(forma.value.rutCompleto)) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'warning',
          text: 'Rut inválido',
          confirmButtonAriaLabel: 'cool'
        });
        return;
      }

      this.rut = clean(forma.value.rutCompleto);
      this.cliente.rut = +this.rut.substring(0,this.rut.length - 1);
      this.cliente.dv = this.rut.charAt(this.rut.length - 1);
      this.cliente.nombre = forma.value.nombre;
      this.cliente.direccion = forma.value.direccion;
      this.cliente.telefono = forma.value.telefono;
      this.cliente.correo = forma.value.correo;
      this.cliente.comunaId = forma.value.comuna;

      if (this.reserva) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          text: `Reserva del libro ${this.libro.titulo} efectuada correctamente`,
          confirmButtonAriaLabel: 'cool'
        });

        this.limpiarPasos();
        return;
      } 
    }

    getComunas(){
      this.serviceComuna.getComunas()
      .subscribe((data:any) => {
        this.comunas = data;
        this.comunas = this.comunas.filter(p=>p.estado.data[0] === 1);
        this.comunas.unshift({
          comunaId:'',
          nombre:'',
        });
        console.log(this.comunas);
      });
    }

    limpiarPasos(){
      this.paso=1;
      this.reserva = false;
      this.compra = false;
    }

}
