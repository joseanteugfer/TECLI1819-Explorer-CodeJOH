import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Actor } from '../models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
    private http: HttpClient) { }

  getRoles(): string[] {
    return ['MANAGER', 'EXPLORER', 'ADMINISTRATOR', 'SPONSOR'];
  }

  registerUser(actor: Actor): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
        .then(response => {
          // Firebase registration was correct, proceed with our backend
          const headers = new HttpHeaders();
          headers.append('Content-Type', 'application/json');
          const url = `${environment.apiBackendUrl}/v1/actors`;
          this.http.post(url, actor, { headers: headers}).toPromise()
            .then(res => {
              resolve(res);
            }, err => {
              reject(err);
            });
        }).catch(error => {
          reject(error);
        });
    });
  }
}
