import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { WorkerDataService } from 'src/app/shared/worker-data.service';
import { WorkerModalService } from 'src/app/shared/worker-modal.service';

@Component({
  selector: 'app-modal-worker',
  templateUrl: './modal-worker.component.html',
  styleUrls: ['./modal-worker.component.scss']
})
export class ModalWorkerComponent implements OnInit {
  public formGroup!: FormGroup;
  public typeModal!: string;
  private id!: number;

  @ViewChild('swalSuccess') swalSuccess!: SwalComponent;
  @ViewChild('swalError') swalError!: SwalComponent;
  @ViewChild('swalErrorConection') swalErrorConection!: SwalComponent;

  constructor(
    public workerModal: WorkerModalService,
    private formBuilder: FormBuilder,
    private workerData: WorkerDataService
  ) {
    this.typeModal = this.workerModal.getTypeModal();
    if (this.typeModal == 'edit')
      this.prepareEditModal();
    else
      this.prepareNewModal();
  }

  ngOnInit(): void {
  }

  private prepareNewModal = () => {
    this.formGroup = this.formBuilder.group({
      id_worker: ['', Validators.required],
      name: ['', Validators.required],
      credito: ['', Validators.required],
      ventaTotal: ['', Validators.required],
      promedio: ['', Validators.required]
    })
  }

  private prepareEditModal = () => {
    const data: Worker = {...this.workerModal.data};
    this.id = data.id_worker;
    this.formGroup = this.formBuilder.group({
      id_worker: [data.id_worker, Validators.required],
      name: [data.name, Validators.required],
      credito: [data.credito, Validators.required],
      ventaTotal: [data.ventaTotal, Validators.required],
      promedio: [data.promedio, Validators.required]
    })
  }

  public hideModal = (e: Event) => {
    const modal = e.target as HTMLElement;
    if (modal.classList.contains('modal-worker'))
      this.workerModal.closeWorkerModal();
  }

  public clearControl = (key: string) => {
    this.formGroup.get(key)!.setValue('');
  }

  public onSubmit = (): any => {
    if (this.formGroup.invalid)
      return this.swalError.fire();
    const params: FormData = new FormData();
    const controls = this.formGroup.controls;
    for (const [key, control] of Object.entries(controls)) {
      console.log('promedio' == key, control.value < 0)
      if (key == 'promedio')
        if (control.value < 0)
          return this.swalError.fire();
        else
          params.append(key, control.value.toFixed(2))
      else
        params.append(key, control.value)
    }
    if (this.typeModal == 'edit') {
      this.workerData.updateWorker(this.id, params)
      .subscribe((res: any) => {
        res.id_worker = parseInt(res.id_worker)
        const position = this.workerData.workers.findIndex(
          (worker: any) => worker.id_worker == this.id
        )
        this.workerData.workers[position] = res;
        this.workerModal.closeWorkerModal();
        this.swalSuccess.fire();
      }, () => this.swalErrorConection.fire())
    } else {
      this.workerData.newWorker(params)
      .subscribe((res: any) => {
        res.id_worker = parseInt(res.id_worker);
        this.workerData.workers.unshift(res);
        this.workerModal.closeWorkerModal();
        this.swalSuccess.fire();
      }, () => this.swalErrorConection.fire())
    }
  }
}

interface Worker {
  id_worker: number;
  name: string;
  credito: number;
  ventaTotal: number;
  promedio: number;
}
