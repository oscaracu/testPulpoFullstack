import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { VehicleCreationComponent } from './vehicle-creation/vehicle-creation.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleUpdateComponent } from './vehicle-update/vehicle-update.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: VehiclesListComponent },
      { path: 'vehicle-details/:id', component: VehicleDetailsComponent },
      { path: 'vehicle-update/:id', component: VehicleUpdateComponent },
      { path: 'vehicle-creation', component: VehicleCreationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
