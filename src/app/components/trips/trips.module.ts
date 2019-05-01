import { NgModule } from '@angular/core';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { MatCardModule, MatFormFieldModule} from '@angular/material';
import { ActorRoleGuard } from 'src/app/guards/actor-role.guard';

const declarables = [
    TripListComponent,
    TripDetailsComponent,
    TripEditComponent
];

const routes = [
    { path : '', component: TripListComponent, canActivate: [ActorRoleGuard],
            data: {expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER|anonymous'} },
    { path : 'details/:id', component: TripDetailsComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER|anonymous'} },
    { path : 'new', component: TripDetailsComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER'} },
    { path : 'edit/:id', component: TripEditComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER'} },
    { path : 'delete/:id', component: TripDetailsComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER'} },
    { path : '**', component: TripListComponent }
];

@NgModule({
    imports: [
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
