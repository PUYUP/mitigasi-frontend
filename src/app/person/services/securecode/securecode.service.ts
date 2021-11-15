import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../endpoint';

@Injectable({
  providedIn: 'root',
})
export class SecurecodeService {
  constructor(private httpClient: HttpClient) {}

  create(param: {}): Observable<any> {
    return this.httpClient
      .post(Endpoints.securecode, param)
      .pipe(map((response: any) => response));
  }

  validate(passcode: string, param: {}): Observable<any> {
    return this.httpClient
      .patch(Endpoints.securecode + passcode + '/', param)
      .pipe(map((response: any) => response));
  }
}
