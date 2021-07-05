import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRountingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { ComunaComponent } from './pages/comuna/comuna.component';
import { TablaComponent } from './components/tabla-comuna/tabla.component';
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { TablaSucursalComponent } from './components/tabla-sucursal/tabla-sucursal.component';
import { LibroComponent } from './pages/libro/libro.component';
import { TablaLibroComponent } from './components/tabla-libro/tabla-libro.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { TablaClientesComponent } from './components/tabla-clientes/tabla-clientes.component';
import { TablaInventarioComponent } from './components/tabla-inventario/tabla-inventario.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { GraficoComponent } from './components/grafico/grafico.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    SidebarComponent,
    HeaderComponent,
    TablaComponent,
    ComunaComponent,
    TablaSucursalComponent,
    SucursalComponent,
    LibroComponent,
    TablaLibroComponent,
    ClienteComponent,
    TablaClientesComponent,
    InventarioComponent,
    TablaInventarioComponent,
    GraficoComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
