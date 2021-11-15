import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from 'src/app/core/endpoints';

@Injectable({
  providedIn: 'root',
})
export class HazardMapService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Hazard lists
   */
  loads(params: any = {}): Observable<any> {
    let url = params?.next ? params?.next : Endpoints.hazard_coordinate;
    let httpParams = new HttpParams();

    for (let key in params) {
      let value = params[key];

      if (value && value != undefined) {
        if (key != 'next' && key != 'type' && value) {
          httpParams = httpParams.set(key, value);
        }
      }
    }

    return this.httpClient
      .get(url, { params: httpParams })
      .pipe(map((response: any) => response));
  }

  /**
   * Retrieve
   */
  load(uuid: string): Observable<any> {
    let url = Endpoints.hazard_coordinate + uuid + '/';
    return this.httpClient.get(url).pipe(map((response: any) => response));
  }

  /**
   * Create
   */
  create(params: any = {}): Observable<any> {
    let url = Endpoints.hazard;
    return this.httpClient
      .post(url, params)
      .pipe(map((response: any) => response));
  }

  /**
   * Update
   */
  update(uuid: string, params: any = {}): Observable<any> {
    let url = Endpoints.hazard + uuid + '/';
    return this.httpClient
      .patch(url, params)
      .pipe(map((response: any) => response));
  }

  /**
   * Delete
   */
  delete(uuid: string): Observable<any> {
    let url = Endpoints.hazard + uuid + '/';
    return this.httpClient.delete(url).pipe(map((response: any) => response));
  }
}
