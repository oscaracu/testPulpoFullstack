import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { StoreModule } from '@ngrx/store';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterSelectComponent } from './filter-select/filter-select.component';
import { NoveltiesCategoriesSelectComponent } from './novelties-categories-select/novelties-categories-select.component';
import { ToggleBtnComponent } from './toggle-btn/toggle-btn.component';
import { VehicleUpdateComponent } from './vehicle-update/vehicle-update.component';
import { VehicleCreationComponent } from './vehicle-creation/vehicle-creation.component';
import { interceptorProvider } from './interceptors/vehicles.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    VehiclesListComponent,
    VehicleDetailsComponent,
    VehicleFormComponent,
    FooterComponent,
    SpinnerComponent,
    FilterSelectComponent,
    NoveltiesCategoriesSelectComponent,
    ToggleBtnComponent,
    VehicleUpdateComponent,
    VehicleCreationComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
