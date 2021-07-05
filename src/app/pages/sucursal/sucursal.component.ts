import { Component, OnInit } from '@angular/core';
import { ComunaService } from '../../services/comuna/comuna.service';
import { SucursalService } from '../../services/sucursal/sucursal.service';

import { Tabla } from '../../interfaces/sucursal';
import { Sucursal } from 'src/app/interfaces/sucursal';
import { Comuna } from 'src/app/interfaces/comuna';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styles: [
  ]
})
export class SucursalComponent implements OnInit {

  tabla:Tabla = {
    title: 'Mantenedor Sucursales',
    headers: ['#','Nombre','Dirección','Encargado','Comuna','Estado', 'Acciones'],
    values:[],
    button:'Nueva Sucursal',
    comunas:[]
  }

  comuna:Comuna[]=[];

  sucursal:Sucursal={
    sucursalId:0,
    nombre:'',
    direccion:'',
    encargado:'',
    comunaId:0,
    comuna:'',
    estado:true
  }

  constructor( private serviceComuna: ComunaService, private serviceSucursal: SucursalService) {
  }

  returnSucursalUpdate(sucursal:Sucursal){
    this.sucursal = sucursal;
  }

  returnSucursalDelete(sucursal:Sucursal){
    this.sucursal = sucursal;

    Swal.fire({
      title: 'Está seguro?',
      text: `Eliminar sucursal ${this.sucursal.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínala'
    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteSucursal(sucursal);

        
      }
      this.limpiarModal();
    })
  }

  limpiarModal(){
    this.sucursal = {
    sucursalId:0,
    nombre:'',
    direccion:'',
    encargado:'',
    comunaId:0,
    comuna:'',
    estado:true
    }
  }

  ngOnInit(): void {

    this.getSucursales();

    this.serviceComuna.getComunas()
    .subscribe((data:any) => {
      this.tabla.comunas = data;
      this.tabla.comunas.unshift({
        comunaId:'',
        nombre:''
      });
      console.log(this.tabla.comunas);
    });

  }

  getSucursales(){
    this.serviceSucursal.getSucursales()
    .subscribe((data:any) => {
    this.tabla.values = data;
    });
  }

saveSucursal(forma: NgForm){

    if (forma.invalid){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'warning',
        text: 'Complete todos los campos',
        confirmButtonAriaLabel: 'cool'
      });
      return;
    }

    this.sucursal.nombre = forma.value.nombre;
    this.sucursal.direccion = forma.value.direccion;
    this.sucursal.encargado = forma.value.encargado;
    this.sucursal.comunaId = forma.value.comuna;

    if (this.sucursal.sucursalId === 0) {
      this.serviceSucursal.addSucursal(this.sucursal)
    .subscribe((data:any) => {
     let resp = data[0];
      if (resp[0].Message === 'Sucursal ingresada correctamente'){
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
      
      this.getSucursales();
    });
      
    } else {
      
        if (forma.invalid){
          Swal.fire({
            allowOutsideClick: false,
            icon: 'warning',
            text: 'Complete todos los campos',
            confirmButtonAriaLabel: 'cool'
          });
          return;
        }

        this.sucursal.nombre = forma.value.nombre;
        this.sucursal.direccion = forma.value.direccion;
        this.sucursal.encargado = forma.value.encargado;
        this.sucursal.comunaId = forma.value.comuna;

        console.log(this.sucursal);
    
        this.serviceSucursal.updateSucursal(this.sucursal)
        .subscribe((data:any) => {
         let resp = data[0];
          if (resp[0].Message == 'Sucursal actualizada correctamente'){
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
        
        this.getSucursales();
    
        });
    }

  }
 

  deleteSucursal(sucursal:Sucursal){
    
    this.serviceSucursal.deleteSucursal(this.sucursal)
        .subscribe((data:any) => {
         let resp = data[0];
         console.log(resp);
          if (resp[0].Message == 'Sucursal eliminada correctamente'){
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

          this.getSucursales();
        });
  }


}
