import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { DeniedAccessPageComponent } from './components/denied-access-page/denied-access-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterManagerComponent } from './components/security/register-manager/register-manager.component';

const routes: Routes = [
  {path: '', redirectTo: '/trips', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'anonymous|EXPLORER|MANAGER|SPONSOR|ADMINISTRATOR' }},
  {path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'anonymous|EXPLORER|MANAGER|SPONSOR|ADMINISTRATOR' }},
  {path: 'register-manager', component: RegisterManagerComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}},
  {path: 'trips', loadChildren: './components/trips/trips.module#TripsModule'},
  {path: 'ordered-trips', loadChildren: './components/orderedtrips/orderedtrips.module#OrderedTripsModule'},
  {path: 'sponsorships', loadChildren: './components/sponsorships/sponsorships.module#SponsorshipsModule'},
  {path: 'settings', loadChildren: './components/settings/settings.module#SettingsModule'},
  {path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'denied-access', component: DeniedAccessPageComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
