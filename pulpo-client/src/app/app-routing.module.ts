import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { RolesGuard } from './guards/roles.guard';
import { LoginComponent } from './login/login.component';
import { VehicleCreationComponent } from './vehicle-creation/vehicle-creation.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleUpdateComponent } from './vehicle-update/vehicle-update.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: VehiclesListComponent,
        canActivate: [RolesGuard],
        data: { validRoles: ['admin', 'user'] },
      },
      {
        path: 'vehicle-details/:id',
        component: VehicleDetailsComponent,
        canActivate: [RolesGuard],
        data: { validRoles: ['admin', 'user'] },
      },
      {
        path: 'vehicle-update/:id',
        component: VehicleUpdateComponent,
        canActivate: [RolesGuard],
        data: { validRoles: ['admin'] },
      },
      {
        path: 'vehicle-creation',
        component: VehicleCreationComponent,
        canActivate: [RolesGuard],
        data: { validRoles: ['admin'] },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
