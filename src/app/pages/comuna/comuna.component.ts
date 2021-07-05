import { Component, OnInit } from '@angular/core';
import { ComunaService } from '../../services/comuna/comuna.service';

import { Tabla } from '../../interfaces/comuna';
import { Comuna } from 'src/app/interfaces/comuna';
import { Region } from 'src/app/interfaces/regiones';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-comuna',
  templateUrl: './comuna.component.html',
  styles: [
  ]
})
export class ComunaComponent implements OnInit{

  tabla:Tabla = {
    title: 'Mantenedor Comunas',
    headers: ['#','Nombre','Id Región','Región','Estado','Acciones'],
    values:[],
    button:'Nueva Comuna',
    regiones:[]
  }

  region:Region[]=[];

  comuna:Comuna={
    comunaId:0,
    nombre:'',
    regionId:0,
    region:'',
    estado:true
  }

  constructor( private service: ComunaService) {
  }

  returnComunaUpdate(comuna:Comuna){
    this.comuna = comuna;
    document.getElementById('')
  }

  returnComunaDelete(comuna:Comuna){
    this.comuna = comuna;

    Swal.fire({
      title: 'Está seguro?',
      text: `Eliminar comuna ${this.comuna.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínala'
    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteComuna(comuna);

      }
      this.limpiarModal();
    })
  }

  limpiarModal(){
    this.comuna = {
      comunaId:0,
      nombre:'',
      regionId:0,
      region:'',
      estado:true}
  }

  ngOnInit(): void {

    this.getComunas();

    this.service.getRegiones()
    .subscribe((data:any) => {
      this.tabla.regiones = data;
      this.tabla.regiones.unshift({
        regionId:'',
        nombre:''
      });
    });

  }

  getComunas(){
    this.service.getComunas()
    .subscribe((data:any) => {
    this.tabla.values = data;
    console.log(data);
    });
  }

saveComuna(forma: NgForm){

    if (forma.invalid){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'warning',
        text: 'Complete todos los campos',
        confirmButtonAriaLabel: 'cool'
      });
      return;
    }

 
    this.comuna.nombre = forma.value.nombre;
    this.comuna.regionId = forma.value.region;

    if (this.comuna.comunaId === 0) {
      this.service.addComuna(this.comuna)
    .subscribe((data:any) => {
     let resp = data[0];
      if (resp[0].Message === 'Comuna ingresada correctamente'){
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
      
      this.getComunas();
    });
      
    } else {
    
        this.service.updateComuna(this.comuna)
        .subscribe((data:any) => {
         let resp = data[0];
          if (resp[0].Message == 'Comuna actualizada correctamente'){
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
        
        this.getComunas();
    
        });
    }
  }

  deleteComuna(comuna:Comuna){
    
    this.service.deleteComuna(this.comuna)
        .subscribe((data:any) => {
         let resp = data[0];
          if (resp[0].Message == 'Comuna eliminada correctamente'){
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

          this.getComunas();
        });
  }


}
