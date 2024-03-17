import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FeatureAService {
  constructor(private http: HttpClient) {}

  create(): Observable<any> {
    return this.http.post('http://localhost:3000', { name: 'sandia' });
  }
}
