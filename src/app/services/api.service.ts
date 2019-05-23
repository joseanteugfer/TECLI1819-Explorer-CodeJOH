import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip.model';
import { OrderedTrip } from '../models/orderedTrip.model';

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

  getTrip(id: string): Observable<Trip> {
    const url = `${environment.apiBackendUrl}/v1/trips/${id}`;
    return this.http.get<Trip>(url);
  }

  postTrip(trip: Trip): Observable<Trip> {
    const url = `${environment.apiBackendUrl}/v1/trips`;
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    header.set('Accept', 'application/json');
    return this.http.post<Trip>(url, trip, { headers: header });
  }

  updateTrip(id: string, trip: Trip) {
    const url = `${environment.apiBackendUrl}/v1/trips/${id}`;
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    header.set('Accept', 'application/json');
    return this.http.put(url, trip, {headers: header});
  }

  updateTripStatus(id: string, status: string, comment: string = 'Empty') {
    const url = `${environment.apiBackendUrl}/v1/trips/${id}/status?val=${status}&comment=${comment}`;
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    header.set('Accept', 'application/json');
    return this.http.put(url, {headers: header});
  }

  getOrderedTrip(): Observable<any> {
    const url = `${environment.apiBackendUrl}/v1/orderedTrips`;
    return this.http.get(url);
  }

  getTripsFromManager(id: string): Observable<any> {
    const url = `${environment.apiBackendUrl}/v1/trips/fromManager/${id}`;
    return this.http.get(url);
  }

  getOrderedTripsFromManager(id: string): Observable<any> {
    const url = `${environment.apiBackendUrl}/v1/orderedTrips/fromManager/${id}`;
    return this.http.get(url);
  }

  getDashboardLatest(): Observable<any> {
    const url = `${environment.apiBackendUrl}/v1/dashboards/latest`;
    return this.http.get(url);
  }

  createOrderedTrip(orderedTrip: string): Observable<any> {
    const url = `${environment.apiBackendUrl}/v1/orderedTrips`;
    const header = new HttpHeaders();
    header.set('Content-Type','application/json');
    header.set('Accept','application/json');
    return this.http.post(url, JSON.parse(orderedTrip), {headers: header});
  }
}
