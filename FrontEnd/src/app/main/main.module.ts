import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { MainRoutingModule } from './main-routing.module';
import { ModalWorkerComponent } from './modal-worker/modal-worker.component';



@NgModule({
  declarations: [
    PrincipalComponent,
    ModalWorkerComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
