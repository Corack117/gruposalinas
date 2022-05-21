import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiRequestsService {
  public url!: string;
  public baseUrl: string = '//localhost:8002';
  public mediaUrl: string = '//localhost:8002/media/';
  private tokenUrl: string = '//localhost:8002/csrf/';
  private workerUrl: string = '/api/worker';

  constructor(private http: HttpClient) { }

  public getToken = (): void => {
    this.http!.get<any>(this.tokenUrl, { withCredentials: true })
    .subscribe()
  }

  public setUrl = (url: string) => {
    this.url = url;
  }

  public setWorkerUrl = (id?: number) => {
    let suffix = ''
    if (id != null)
      suffix = `/${id}`;
    this.url = this.baseUrl + this.workerUrl + suffix;
  }

  public get = (): Observable<any>  => {
    const options = {
      withCredentials: true,
    }
    return this.http!.get<any>(this.url, options)
  }

  public getWParams = (params: any): Observable<any> => {
    const options = {
      params: params,
      withCredentials: true,
    }
    return this.http!.get<any>(this.url, options);
  }

  public post = (params: FormData): Observable<any> => {
    const options = {
      withCredentials: true,
    }
    return this.http!.post<any>(this.url, params, options)
  }
}
