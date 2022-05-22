import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { WorkerDataService } from '../shared/worker-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public isShowModal: boolean = false;
  public worker!: any;
  public formGroup!: FormGroup;

  @ViewChild('swalNotWorker') swalNotWorker!: SwalComponent;
  @ViewChild('swalError') swalError!: SwalComponent;

  constructor(
    private workerData: WorkerDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      searchById: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  public clearInput = (key: string) => {
    this.formGroup.get(key)!.setValue('');
  }

  public showModal = () => {
    this.isShowModal = !this.isShowModal;
  }

  public hideModal = (e: Event) => {
    const modal = e.target as HTMLElement;
    if (modal.classList.contains('modal-data'))
      this.isShowModal = !this.isShowModal;
  }

  public redirectTo = (url: string) => {
    this.router.navigateByUrl(url)
  }

  public onSubmit = (): any => {
    const id = parseInt(this.formGroup.value.searchById);
    if (this.formGroup.invalid)
      return
    const filter = {
      id_worker: this.formGroup.value.searchById,
      name: ''
    }
    this.workerData.filterDataWorkers(filter)
    .subscribe((res) => {
      res = res.filter((worker: any) => worker.id_worker == id);
      this.worker = res[0];
      if (res.length > 0)
        this.showModal();
      else
        this.swalNotWorker.fire();
    }, () => this.swalError.fire())
  }
}
