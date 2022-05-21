import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestsService } from './api-requests.service';

@Injectable({
  providedIn: 'root'
})

export class WorkerDataService {
  public workers!: any;

  constructor(private requestService: ApiRequestsService) { }

  public getDataWorkers = (): Observable<any> => {
    this.requestService.setWorkerUrl();
    return this.requestService.get()
  }

  public filterDataWorkers = (filters: Filters): Observable<any> => {
    this.requestService.setWorkerUrl();
    return this.requestService.getWParams(filters)
  }

  public newWorker = (params: FormData) => {
    this.requestService.setWorkerUrl();
    params.append('info', 'new');
    return this.requestService.post(params)
  }

  public updateWorker = (id: number, params: FormData) => {
    this.requestService.setWorkerUrl(id);
    params.append('info', 'update');
    return this.requestService.post(params)
  }

  public deleteWorker = (id: number) => {
    this.requestService.setWorkerUrl(id);
    const params: FormData = new FormData();
    params.append('info', 'delete');
    return this.requestService.post(params);
  }
}

interface Filters {
  name: string
}
