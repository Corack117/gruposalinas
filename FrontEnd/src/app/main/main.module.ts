import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { FiltersComponent } from './filters/filters.component';
import { ModalWorkerComponent } from './modal-worker/modal-worker.component';
import { PrincipalComponent } from './principal/principal.component';
// import { ViewDataComponent } from './view-data/view-data.component';

// Modules
import { MainRoutingModule } from './main-routing.module';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    PrincipalComponent,
    ModalWorkerComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MainRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class MainModule { }
