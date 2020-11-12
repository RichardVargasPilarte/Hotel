import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes de Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const MaterialComponents = [
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatExpansionModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
];

// Componentes
import { SidenavComponent } from './components/shared/sidenav/sidenav.component';
import { ListadoAlojamientosComponent } from './components/Alojamientos/listado-alojamientos/listado-alojamientos.component';
import { FormularioAlojamientosComponent } from './components/Alojamientos/formulario-alojamientos/formulario-alojamientos.component';
import { ListadoHabitacionesComponent } from './components/Habitaciones/listado-habitaciones/listado-habitaciones.component';
import { FormularioHabitacionesComponent } from './components/Habitaciones/formulario-habitaciones/formulario-habitaciones.component';
import { ListadoUsuariosComponent } from './components/Usuarios/listado-usuarios/listado-usuarios.component';
import { FormularioUsuariosComponent } from './components/Usuarios/formulario-usuarios/formulario-usuarios.component';

// Servicios
import { AlojamientosService } from '../app/services/alojamientos.service';
import { HabitacionesService } from '../app/services/habitaciones.service';
import { UsuariosService } from '../app/services/usuarios.service';

const Servicios = [
  AlojamientosService,
  HabitacionesService,
  UsuariosService
]

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ListadoAlojamientosComponent,
    FormularioAlojamientosComponent,
    ListadoHabitacionesComponent,
    FormularioHabitacionesComponent,
    ListadoUsuariosComponent,
    FormularioUsuariosComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ],
  providers: [
    Servicios
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
