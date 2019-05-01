import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { TripComponent } from './components/trip/trip.component';
import { OrderedTripComponent } from './components/ordered-trip/ordered-trip.component';
import { TripDisplayComponent } from './components/trip-display/trip-display.component';
import { TripCreateComponent } from './components/trip-create/trip-create.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { TripDeleteComponent } from './components/trip-delete/trip-delete.component';
import { SponsorshipComponent } from './components/sponsorship/sponsorship.component';
import { OrderedTripEditComponent } from './components/ordered-trip-edit/ordered-trip-edit.component';
import { DashboardTripPerManagerComponent } from './components/dashboard-trip-per-manager/dashboard-trip-per-manager.component';
// tslint:disable-next-line: max-line-length
import { DashboardOrderedTripsPerTripComponent } from './components/dashboard-ordered-trips-per-trip/dashboard-ordered-trips-per-trip.component';
import { DashboardPricePerTripComponent } from './components/dashboard-price-per-trip/dashboard-price-per-trip.component';
// tslint:disable-next-line: max-line-length
import { DashboardOrderedTripsByStatusComponent } from './components/dashboard-ordered-trips-by-status/dashboard-ordered-trips-by-status.component';
import { DashboardPriceInFindersComponent } from './components/dashboard-price-in-finders/dashboard-price-in-finders.component';
import { DashboardTopKeywordsComponent } from './components/dashboard-top-keywords/dashboard-top-keywords.component';
import { SettingEditComponent } from './components/setting-edit/setting-edit.component';
import { SettingComponent } from './components/setting/setting.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileDisplayComponent } from './components/profile-display/profile-display.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { DeniedAccessPageComponent } from './components/denied-access-page/denied-access-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/trips', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'anonymous'}},
  {path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'anonymous'}},
  {path: 'trips', children: [
    {path: 'create' , component: TripCreateComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER'}},
// tslint:disable-next-line: max-line-length
    {path: 'edit/:id', component: TripEditComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER'}},
    {path: 'delete/:id', component: TripDeleteComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER'}},
    {path: ':id', component: TripDisplayComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER'}},
    {path: '', component: TripComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'anonymous|ADMINISTRATOR|MANAGER|EXPLORER'}}
  ]},
  {path: 'ordered-trips', children: [
    // El explorer tb debería poder cancelar una reserva?
    {path: 'edit/:id', component: OrderedTripEditComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER|EXPLORER'}},
    {path: '', component: OrderedTripComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER|EXPLORER'}}
  ]},
  {path: 'profile', children: [
// tslint:disable-next-line: max-line-length
    {path: 'edit/:id', component: ProfileEditComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER'}},
// tslint:disable-next-line: max-line-length
    {path: ':id', component: ProfileDisplayComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER'}},
    {path: '', component: ProfileComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}}
  ]},
  {path: 'dashboard', children: [
// tslint:disable-next-line: max-line-length
    {path: 'trips-per-manager', component: DashboardTripPerManagerComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}},
// tslint:disable-next-line: max-line-length
    {path: 'orederedtips-per-trip', component: DashboardOrderedTripsPerTripComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}},
// tslint:disable-next-line: max-line-length
    {path: 'price-per-trip', component: DashboardPricePerTripComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}},
// tslint:disable-next-line: max-line-length
    {path: 'orderedtrip-by-status', component: DashboardOrderedTripsByStatusComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}},
// tslint:disable-next-line: max-line-length
    {path: 'price-in-finders', component: DashboardPriceInFindersComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}},
    {path: 'topkeywords', component: DashboardTopKeywordsComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}}
  ]},
  {path: 'sponsorship', component: SponsorshipComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'SPONSOR'}},
  {path: 'settings', children: [
    {path: 'edit/:id', component: SettingEditComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}},
    {path: '', component: SettingComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'ADMINISTRATOR'}}
  ]},
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
