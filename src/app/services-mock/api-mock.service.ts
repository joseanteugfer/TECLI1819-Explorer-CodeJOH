import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip.model';

const Trips: Trip[] = [
    {
        _id : '5c9f5307bb7a48933ee85ef7',
        requirements : [ ],
        pictures : [ ],
        status : 'CREATED',
        ticker : '190127-MQSQ',
        title : 'Paris',
        manager : '5c9f5306bb7a48933ee85eb0',
        description : 'Paris trip',
        date_start : new Date('2019-01-27T00:00:00.000+0000'),
        date_end : new Date('2019-02-09T00:00:00.000+0000'),
        price : 814,
        stages : [
            {
                _id : '5c9f5307bb7a48933ee85efa',
                title : 'Stage1 - Paris',
                description : 'Stage number1for trip to Paris',
                price : 195,
                _v: 0
            },
            {
                _id : '5c9f5307bb7a48933ee85ef9',
                title : 'Stage2 - Paris',
                description : 'Stage number2for trip to Paris',
                price : 243,
                _v: 0
            },
            {
                _id : '5c9f5307bb7a48933ee85ef8',
                title : 'Stage3 - Paris',
                description : 'Stage number3for trip to Paris',
                price : 376,
                _v: 0
            }
        ],
        created : new Date('2019-03-30T11:29:11.110+0000'),
        sponsorships : [ ],
        __v : 0
    },
    {
        _id : '5c9f5307bb7a48933ee85efb',
        requirements : [ ],
        pictures : [ ],
        status : 'STARTED',
        ticker : '180419-OOBG',
        title : 'Sevilla',
        manager : '5c9f5306bb7a48933ee85eaf',
        description : 'Sevilla trip',
        date_start : new Date('2018-04-19T00:00:00.000+0000'),
        date_end : new Date('2018-04-26T00:00:00.000+0000'),
        price : 1099,
        stages : [
            {
                _id : '5c9f5307bb7a48933ee85eff',
                title : 'Stage1 - Sevilla',
                description : 'Stage number1for trip to Sevilla',
                price : 177,
                _v: 0
            },
            {
                _id : '5c9f5307bb7a48933ee85efe',
                title : 'Stage2 - Sevilla',
                description : 'Stage number2for trip to Sevilla',
                price : 387,
                _v: 0
            },
            {
                _id : '5c9f5307bb7a48933ee85efd',
                title : 'Stage3 - Sevilla',
                description : 'Stage number3for trip to Sevilla',
                price : 342,
                _v: 0
            },
            {
                _id : '5c9f5307bb7a48933ee85efc',
                title : 'Stage4 - Sevilla',
                description : 'Stage number4for trip to Sevilla',
                price : 193,
                _v: 0
            }
        ],
        created : new Date('2019-03-30T11:29:11.111+0000'),
        sponsorships : [ ],
        __v : 0
    },
    {
        _id : '5c9f5307bb7a48933ee85f06',
        requirements : [ ],
        pictures : [ ],
        status : 'CANCELLED',
        ticker : '180212-FZRB',
        title : 'Vigo',
        manager : '5c9f5306bb7a48933ee85eb0',
        description : 'Vigo trip',
        date_start : new Date('2018-02-12T00:00:00.000+0000'),
        date_end : new Date('2018-02-19T00:00:00.000+0000'),
        price : 1143,
        stages : [
            {
                _id : '5c9f5307bb7a48933ee85f0b',
                title : 'Stage1 - Vigo',
                description : 'Stage number1for trip to Vigo',
                price : 68,
                _v: 0
            },
            {
                _id : '5c9f5307bb7a48933ee85f0a',
                title : 'Stage2 - Vigo',
                description : 'Stage number2for trip to Vigo',
                price : 264,
                _v: 0
            },
            {
                _id : '5c9f5307bb7a48933ee85f09',
                title : 'Stage3 - Vigo',
                description : 'Stage number3for trip to Vigo',
                price : 259,
                _v: 0
            },
            {
                _id : '5c9f5307bb7a48933ee85f08',
                title : 'Stage4 - Vigo',
                description : 'Stage number4for trip to Vigo',
                price : 297,
                _v: 0
            },
            {
                _id : '5c9f5307bb7a48933ee85f07',
                title : 'Stage5 - Vigo',
                description : 'Stage number5for trip to Vigo',
                price : 255,
                _v: 0
            }
        ],
        created : new Date('2019-03-30T11:29:11.114+0000'),
        sponsorships : [ ],
        __v : 0
    }
];

@Injectable()
export class ApiMockService {

    private trips: Trip[] = Trips;

    constructor(private http: HttpClient) { }

    getActor(id: string): Observable<any> {
        const url = `${environment.apiBackendUrl}/v1/actors/${id}`;
        return this.http.get(url);
    }

    getTrips(): Observable<Trip[]> {
        return of(this.trips);
    }

    getTrip(id: string): Observable<Trip> {
        const found = this.trips.find(t => t._id === id);
        return found ? of(found) : throwError(new Error('Not found'));
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
        header.set('Content-Type','application/json');
        header.set('Accept','application/json');
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
