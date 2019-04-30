import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getActor(id: string): Observable<any> {
    const url = `${environment.apiBackendUrl}/v1/actors/${id}`;
    return this.http.get(url);
  }

  getTrips(): Observable<any> {
    const url = `${environment.apiBackendUrl}/v1/trips`;
    return this.http.get(url);
  }

  getTrip(id: string): Observable<any> {
    const url = `${environment.apiBackendUrl}/v1/trips/${id}`;
    return this.http.get(url);
  }

  getOrderedTrip(): Observable<any> {
    const url = `${environment.apiBackendUrl}/v1/orderedTrips`;
    return this.http.get(url);
  }
}
