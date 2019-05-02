import { NgModule } from '@angular/core';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { MatCardModule, MatFormFieldModule} from '@angular/material';
import { ActorRoleGuard } from 'src/app/guards/actor-role.guard';
import { TripListManagedComponent } from './trip-list-managed/trip-list-managed.component';
import locales from '@angular/common/locales/es';
import { CoreModule } from 'src/app/core/core.module';


const declarables = [
    TripListComponent,
    TripDetailsComponent,
    TripEditComponent,
    TripListManagedComponent
];

const routes = [
    { path : 'managed', component: TripListManagedComponent, canActivate: [ActorRoleGuard],
            data: {expectedRole: 'MANAGER'} },
    { path : 'details/:id', component: TripDetailsComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER|anonymous'} },
    { path : 'new', component: TripDetailsComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER'} },
    { path : 'edit/:id', component: TripEditComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER'} },
    { path : 'delete/:id', component: TripDetailsComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER'} },
    { path : '', component: TripListComponent, canActivate: [ActorRoleGuard],
            data: {expectedRole: 'SPONSOR|ADMINISTRATOR|MANAGER|EXPLORER|anonymous'} },
    { path : '**', component: TripListComponent }
];

registerLocaleData(locales, 'es');

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        DatePipe
    ],
    declarations: declarables,
    exports: declarables
})
export class TripsModule {}
