import { Injectable } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerModalService {
  public data!: Worker;
  public workerLoaded!: Promise<boolean>;
  private showModal: boolean = false;
  private typeModal!: string;

  constructor(private requestService: ApiRequestsService) { }

  public isShowModal = () => {
    return this.showModal;
  }

  public showWorkerModal = (id: number) => {
    this.typeModal = 'edit';
    this.requestService.setWorkerUrl(id);
    this.requestService.get()
    .subscribe((res: Worker[]) => {
      this.data = res.find(worker => worker.id_worker === id)!;
      this.workerLoaded = Promise.resolve(true);
      this.showModal = true;
    })
  }

  public newWorkerModal = () => {
    this.typeModal = 'new';
    this.showModal = true;
  }

  public getTypeModal = () => {
    return this.typeModal;
  }

  public closeWorkerModal = () => {
    this.showModal = false;
  }
}

interface Worker {
  id_worker: number;
  name: string;
  credito: number;
  ventaTotal: number;
  promedio: number;
}
