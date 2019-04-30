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

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'trips', children: [
    {path: 'create' , component: TripCreateComponent},
    {path: 'edit/:id', component: TripEditComponent},
    {path: 'delete/:id', component: TripDeleteComponent},
    {path: ':id', component: TripDisplayComponent},
    {path: '', component: TripComponent}
  ]},
  {path: 'ordered-trips', children: [
    {path: 'edit/:id', component: OrderedTripEditComponent},
    {path: '', component: OrderedTripComponent}
  ]},
  {path: 'profile', children: [
    {path: 'edit/:id', component: ProfileEditComponent},
    {path: ':id', component: ProfileDisplayComponent},
    {path: '', component: ProfileComponent}
  ]},
  {path: 'dashboard', children: [
    {path: 'trips-per-manager', component: DashboardTripPerManagerComponent},
    {path: 'orederedtips-per-trip', component: DashboardOrderedTripsPerTripComponent},
    {path: 'price-per-trip', component: DashboardPricePerTripComponent},
    {path: 'orderedtrip-by-status', component: DashboardOrderedTripsByStatusComponent},
    {path: 'price-in-finders', component: DashboardPriceInFindersComponent},
    {path: 'topkeywords', component: DashboardTopKeywordsComponent}
  ]},
  {path: 'sponsorship', component: SponsorshipComponent},
  {path: 'settings', children: [
    {path: 'edit/:id', component: SettingEditComponent},
    {path: '', component: SettingComponent}
  ]},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
