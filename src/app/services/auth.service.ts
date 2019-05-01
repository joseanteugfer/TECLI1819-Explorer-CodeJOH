import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Actor } from '../models/actor.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
    private http: HttpClient) {
  }
  currentActor: Actor;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserAuthenticated());

  getCurrentActor(): Actor {
    return this.currentActor;
  }

  getRoles(): string[] {
    return ['EXPLORER', 'MANAGER', 'ADMINISTRATOR', 'SPONSOR'];
  }

  // He cambiado la funcionalidad a la inversa para que se correspondiese mejor con el nombre del método
  isUserAuthenticated(): boolean {
    return !(localStorage.getItem('token') === undefined || localStorage.getItem('token') === '');
  }

  registerUser(actor: Actor): Promise < any > {
        return new Promise<any>((resolve, reject) => {
          console.log(actor.email);
          this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
            .then(response => {
              // Firebase registration was correct, proceed with our backend
              const headers = new HttpHeaders();
              headers.append('Content-Type', 'application/json');
              const url = `${environment.apiBackendUrl}/v1/actors`;
              console.log(actor);
              this.http.post(url, actor, { headers: headers }).toPromise()
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

  login(email: string, password: string): Promise < any > {
        const url = environment.apiBackendUrl + `/v1/login?email=${email}&password=${password}`;
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return new Promise<any>((resolve, reject) => {
          this.http.get<Actor>(url).toPromise()
            .then(res => {
              if (res) {
                this.currentActor = res;
                this.fireAuth.auth.signInWithCustomToken(res.customToken)
                  .then(customToken => {
                    this.fireAuth.auth.currentUser.getIdToken()
                      .then(
                        (token: string) => {
                          localStorage.setItem('token', token);
                          localStorage.setItem('activeRole', this.currentActor.role[0]);
                          this.loggedIn.next(true);
                          resolve(this.currentActor);
                        }
                      );
                  })
                  .catch(error => {
                    console.log(error);
                    reject(error);
                  });
              } else {
                reject('Error while login');
              }
            }, error => { console.log(error); reject(error); })
            .catch(error => {
              console.log(error);
              reject(error);
            });
        });
      }
}
