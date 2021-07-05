import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro/libro.service';

import { Libro } from 'src/app/interfaces/libro';
import { Tabla } from 'src/app/interfaces/libro';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styles: [
  ]
})
export class LibroComponent implements OnInit {

  tabla:Tabla = {
    title: 'Mantenedor Libros',
    headers: ['#','Isbn','Título','Autor','Editorial','Año','Tapa','Precio','Estado','Acciones'],
    values:[],
    button:'Nuevo Libro'
  }

  libro:Libro={
    libroId:0,
    isbn:'',
    titulo:'',
    autor:'',
    editorial:'',
    annio:0,
    tapa:'',
    precio:0,
    estado:true
  }

  constructor( private service: LibroService) {
  }

  returnLibroUpdate(libro:Libro){
    this.libro = libro;
  }

  returnLibroDelete(libro:Libro){
    this.libro = libro;

    Swal.fire({
      title: 'Está seguro?',
      text: `Eliminar Libro ${this.libro.titulo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínala'
    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteLibro(libro);

      }
      this.limpiarModal();
    })
  }

  limpiarModal(){
    this.libro = {
      libroId:0,
      isbn:'',
      titulo:'',
      autor:'',
      editorial:'',
      annio:0,
      tapa:'',
      precio:0,
      estado:true
    }
  }

  ngOnInit(): void {

    this.getLibros();

  }

  getLibros(){
    this.service.getLibros()
    .subscribe((data:any) => {
    this.tabla.values = data;
    console.log(data);
    });
  }

saveLibro(forma: NgForm){

    if (forma.invalid){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'warning',
        text: 'Complete todos los campos',
        confirmButtonAriaLabel: 'cool'
      });
      return;
    }

    this.libro.isbn = forma.value.isbn;
    this.libro.titulo = forma.value.titulo;
    this.libro.autor = forma.value.autor;
    this.libro.editorial = forma.value.editorial;
    this.libro.annio = forma.value.annio;
    this.libro.tapa = forma.value.tapa;
    this.libro.precio = forma.value.precio;

    if (this.libro.libroId === 0) {
      this.service.addLibro(this.libro)
    .subscribe((data:any) => {
     let resp = data[0];
      if (resp[0].Message === 'Libro ingresado correctamente'){
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
      
      this.getLibros();
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

        this.libro.isbn = forma.value.isbn;
        this.libro.titulo = forma.value.titulo;
        this.libro.autor = forma.value.autor;
        this.libro.editorial = forma.value.editorial;
        this.libro.annio = forma.value.annio;
        this.libro.tapa = forma.value.tapa;
        this.libro.precio = forma.value.precio;

        console.log(this.libro);
    
        this.service.updateLibro(this.libro)
        .subscribe((data:any) => {
         let resp = data[0];
          if (resp[0].Message == 'Libro actualizado correctamente'){
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
        
        this.getLibros();
    
        });
    }
  }

  deleteLibro(comuna:Libro){
    
    this.service.deleteLibro(this.libro)
        .subscribe((data:any) => {
         let resp = data[0];
          if (resp[0].Message == 'Libro eliminado correctamente'){
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

          this.getLibros();
        });
  }


}
