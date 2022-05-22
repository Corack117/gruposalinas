import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { WorkerDataService } from 'src/app/shared/worker-data.service';
import { WorkerModalService } from 'src/app/shared/worker-modal.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {
  public isShowModal: boolean = false;
  public worker!: any;
  private orderedBy: string = 'lastName';
  private isAscendant: boolean = true;

  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('swalSuccess') swalSuccess!: SwalComponent;
  @ViewChild('swalError') swalError!: SwalComponent;

  constructor(
    public workerData: WorkerDataService,
    public workerModal: WorkerModalService
  ) {
    this.workerData.getDataWorkers()
    .subscribe((res: any) => {
      this.workerData.workers = res;
    }, () => this.swalError.fire())
  }

  ngOnInit(): void {
  }

  public orderBy = (key: string) => {
    if (this.orderedBy != key) {
      this.orderedBy = key;
      this.isAscendant = true;
    }
    if(this.isAscendant)
      this.workerData.workers.sort((a: any, b: any) => {
        return a[key] > b[key];
      })
    else
      this.workerData.workers.sort((a: any, b: any) => {
        return a[key] < b[key];
      })
    this.isAscendant = !this.isAscendant;
  }

  public showModal = (id: number) => {
    this.worker = this.workerData.workers.find((worker: any) => {
      return worker.id === id
    })

    this.isShowModal = !this.isShowModal;
  }

  public hideModal = (e: Event) => {
    const modal = e.target as HTMLElement;
    if (modal.classList.contains('modal-data'))
      this.isShowModal = !this.isShowModal;
  }

  public deleteWorker = (id: number) => {
    this.workerData.deleteWorker(id).subscribe(() => {
      this.swalSuccess.fire();
      this.workerData.workers = this.workerData.workers.filter(
        (worker: any) => worker.id != id
      );
    },
      () => this.swalError.fire()
    )
  }
}
