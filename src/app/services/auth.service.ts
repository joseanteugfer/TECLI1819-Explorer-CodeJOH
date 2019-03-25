import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getRoles(): string[] {
    return [''];
  }

  registerUser(value): Promise<any> {
    return new Promise<any>((resolve, reject) => {

    });
  }
}
