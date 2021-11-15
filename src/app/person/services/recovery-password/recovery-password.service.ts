import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../endpoint';

@Injectable({
  providedIn: 'root',
})
export class RecoveryPasswordService {
  constructor(private httpClient: HttpClient) {}

  recovery(param: {}): Observable<any> {
    return this.httpClient
      .post(Endpoints.recoveryPassword, param)
      .pipe(map((response: any) => response));
  }
}
