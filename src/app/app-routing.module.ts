import { Routes, RouterModule } from '@angular/router';
import { ListadoAlojamientosComponent } from './components/Alojamientos/listado-alojamientos/listado-alojamientos.component';
import { FormularioAlojamientosComponent } from './components/Alojamientos/formulario-alojamientos/formulario-alojamientos.component';
import { ListadoHabitacionesComponent } from './components/Habitaciones/listado-habitaciones/listado-habitaciones.component';
import { FormularioHabitacionesComponent } from './components/Habitaciones/formulario-habitaciones/formulario-habitaciones.component';
import { ListadoUsuariosComponent } from './components/Usuarios/listado-usuarios/listado-usuarios.component';
import { FormularioUsuariosComponent } from './components/Usuarios/formulario-usuarios/formulario-usuarios.component';

const APP_ROUTES: Routes = [
  { path: 'Alojamientos/Listado', component: ListadoAlojamientosComponent },
  { path: 'Alojamientos/Formularios', component: FormularioAlojamientosComponent },
  { path: 'Alojamientos/Formularios/:id', component: FormularioAlojamientosComponent },
  { path: 'Habitaciones/Listado', component: ListadoHabitacionesComponent },
  { path: 'Habitaciones/Formularios', component: FormularioHabitacionesComponent },
  { path: 'Habitaciones/Formularios/:id', component: FormularioHabitacionesComponent },
  { path: 'Usuarios/Listado', component: ListadoUsuariosComponent },
  { path: 'Usuarios/Formularios', component: FormularioUsuariosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'Alojamientos/Listado' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
