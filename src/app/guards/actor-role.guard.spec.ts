import { TestBed, async, inject } from '@angular/core/testing';

import { ActorRoleGuard } from './actor-role.guard';
import { AuthService } from '../services/auth.service';
import { Actor } from '../models/actor.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

describe('ActorRoleGuard', () => {
  let actorRoleGuard: ActorRoleGuard;
  let authService: AuthService;
  const routeDataMock: any = { snapshot: {}, route: { data: ['EXPLORER'] } };
  const routeStateMock: any = { snapshot: {} };
  const routerMock = {navigate: jasmine.createSpy('navigate')}
  const firebaseConfig = {
    apiKey: 'AIzaSyBDPPdxUsnYcPMc4yUs2ZRQfkXXW0wZFKE',
    authDomain: 'acme-explorer-code-joh.firebaseapp.com',
    databaseURL: 'https://acme-explorer-code-joh.firebaseio.com',
    projectId: 'acme-explorer-code-joh',
    storageBucket: 'acme-explorer-code-joh.appspot.com',
    messagingSenderId: '513136153151'
}

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      providers: [ActorRoleGuard, AuthService, AngularFireAuth, ApiService, { provide: Router, useValue: routerMock }]
    });
  });

  beforeEach(() => {
    actorRoleGuard = TestBed.get(ActorRoleGuard);
    authService = TestBed.get(authService);
  });

  it('should be created', () => {
    expect(actorRoleGuard).toBeTruthy();
  });

  it('be ale to hit route when user is logged in', () => {
    authService.currentActor = new Actor();
    authService.currentActor.role = "EXPLORER";
    expect(actorRoleGuard.canActivate(routeDataMock, routeStateMock)).toBe(true);
  });

  
});
