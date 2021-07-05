import { Component, OnInit } from '@angular/core';
import { ComunaService } from '../../services/comuna/comuna.service';
import { ClienteService } from '../../services/cliente/cliente.service';

import { Tabla } from '../../interfaces/cliente';
import { Cliente } from 'src/app/interfaces/cliente';
import { Comuna } from 'src/app/interfaces/comuna';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2'

import { validate, clean, format, getCheckDigit } from 'rut.js'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit {

  tabla:Tabla = {
    title: 'Mantenedor Clientes',
    headers: ['#','Nombre','Rut','Dirección','Comuna','Teléfono','Correo','Valor','Estado','Acciones'],
    values:[],
    button:'Nuevo Cliente',
    comunas:[]
  }

  valores:string[] = ['','Bronce', 'Plata', 'Oro','Platinium'];

  comuna:Comuna[]=[];
  rut:string='';

  cliente:Cliente={
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

  constructor( private serviceComuna: ComunaService, private serviceCliente: ClienteService) {
  }

  returnClienteUpdate(cliente:Cliente){
    this.cliente = cliente;
    console.log(this.cliente);
    this.rut = this.cliente.rut + '-' + this.cliente.dv;
    console.log(this.rut);
  }

  returnClienteDelete(cliente:Cliente){
    this.cliente = cliente;

    Swal.fire({
      title: 'Está seguro?',
      text: `Eliminar cliente ${this.cliente.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteCliente(cliente);

        
      }
      this.limpiarModal();
    })
  }

  limpiarModal(){
    this.cliente = {
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
  }

  ngOnInit(): void {

    this.getClientes();

    this.serviceComuna.getComunas()
    .subscribe((data:any) => {
      this.tabla.comunas = data;
      this.tabla.comunas = this.tabla.comunas.filter(p=>p.estado.data[0] === 1);
      this.tabla.comunas.unshift({
        comunaId:'',
        nombre:'',
      });
      console.log(this.tabla.comunas);
    });

  }

  getClientes(){
    this.serviceCliente.getClientes()
    .subscribe((data:any) => {
    this.tabla.values = data;
    console.log(this.tabla.values);
    });
  }

saveCliente(forma: NgForm){

    if (forma.invalid){
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
    this.cliente.password = forma.value.password;
    this.cliente.valor = forma.value.valor;
    this.cliente.comunaId = forma.value.comuna;

    console.log(this.cliente);

    if (this.cliente.clienteId === 0) {
      this.serviceCliente.addCliente(this.cliente)
    .subscribe((data:any) => {
     let resp = data[0];
      if (resp[0].Message === 'Cliente ingresado correctamente'){
        document.getElementById('closeModal')?.click();
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          text: resp[0].Message,
          confirmButtonAriaLabel: 'cool'
        });
      } else {
        document.getElementById('closeModal')?.click();
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          text: resp[0].Warning,
          confirmButtonAriaLabel: 'cool'
        });
      }
      
      this.getClientes();
    });
      
    } else {
      
        this.serviceCliente.updateCliente(this.cliente)
        .subscribe((data:any) => {
         let resp = data[0];
          if (resp[0].Message == 'Cliente actualizado correctamente'){
            document.getElementById('closeModal')?.click();
            Swal.fire({
              allowOutsideClick: false,
              icon: 'success',
              text: resp[0].Message,
              confirmButtonAriaLabel: 'cool'
            });
          } else {
            document.getElementById('closeModal')?.click();
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              text: resp[0].Warning,
              confirmButtonAriaLabel: 'cool'
            });
          }
        
        this.getClientes();
    
        });
    }

  }
 

  deleteCliente(cliente:Cliente){
    
    this.serviceCliente.deleteCliente(this.cliente)
        .subscribe((data:any) => {
         let resp = data[0];
         console.log(resp);
          if (resp[0].Message == 'Cliente eliminado correctamente'){
            Swal.fire({
              allowOutsideClick: false,
              icon: 'success',
              text: resp[0].Message,
              confirmButtonAriaLabel: 'cool'
            });
          } else {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              text: resp[0].Warning,
              confirmButtonAriaLabel: 'cool'
            });
          }

          this.getClientes();
        });
  }


}

