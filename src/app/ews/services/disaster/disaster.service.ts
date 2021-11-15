import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from 'src/app/core/endpoints';

@Injectable({
  providedIn: 'root',
})
export class DisasterService {
  constructor(private httpClient: HttpClient) {}

  /**
   * BNPB Dipi scraper
   */
  bnpb_dipi_scraper(params: any = {}): Observable<any> {
    let url = Endpoints.scraper_bnpb_dipi;

    return this.httpClient
      .post(url, params)
      .pipe(map((response: any) => response));
  }

  /**
   * Disaster lists
   */
  loads(params: any = {}): Observable<any> {
    let url = params?.next ? params?.next : Endpoints.disaster;
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
    let url = Endpoints.disaster + uuid + '/';
    return this.httpClient.get(url).pipe(map((response: any) => response));
  }
}
