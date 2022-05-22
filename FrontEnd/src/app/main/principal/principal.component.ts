import { Component, OnInit } from '@angular/core';
import { WorkerModalService } from 'src/app/shared/worker-modal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  constructor(public workerModal: WorkerModalService) {}

  ngOnInit(): void {
  }

  public newWorker = () => {
    this.workerModal.newWorkerModal();
  }
}
