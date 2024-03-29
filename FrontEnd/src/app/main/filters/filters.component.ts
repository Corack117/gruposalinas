import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { WorkerDataService } from 'src/app/shared/worker-data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public formGroup!: FormGroup;

  @ViewChild('swalError') swalError!: SwalComponent;

  constructor(
    private workerData: WorkerDataService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      searchByName: [''],
      searchById: [''],
    })
  }

  ngOnInit(): void {
  }

  public clearInput = (key: string) => {
    this.formGroup.get(key)!.setValue('');
  }

  public onSubmit = () => {
    const filters: Filters = {
      id_worker: this.formGroup.value.searchById,
      name: this.formGroup.value.searchByName
    }
    this.workerData.filterDataWorkers(filters)
    .subscribe((res: any) => {
      res.id_worker = parseInt(res.id_worker)
      const id = this.formGroup.value.searchById;
      if (this.formGroup.value.searchById != '')
        res = res.filter((worker: any) => worker.id_worker == id);
      this.workerData.workers = res;
    }, () => this.swalError.fire())
  }
}

interface Filters {
  id_worker: number,
  name: string
}
