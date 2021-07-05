import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ComunaComponent } from './pages/comuna/comuna.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { LibroComponent } from './pages/libro/libro.component';
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { ClienteComponent } from './pages/cliente/cliente.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'comuna', component: ComunaComponent},
  {path: 'inventario', component: InventarioComponent},
  {path: 'libro', component: LibroComponent},
  {path: 'sucursal', component: SucursalComponent},
  {path: 'cliente', component: ClienteComponent},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [RouterModule]
})

export class AppRountingModule { }
