import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatFormFieldModule} from '@angular/material';
import { ActorRoleGuard } from 'src/app/guards/actor-role.guard';
import { OrderedTripsEditComponent } from './ordered-trips-edit/ordered-trips-edit.component';
import { OrderedTripsListComponent } from './ordered-trips-list/ordered-trips-list.component';


const declarables = [
    OrderedTripsEditComponent,
    OrderedTripsListComponent
];

const routes = [
    { path : '', component: OrderedTripsListComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'MANAGER|EXPLORER'} },
    { path : 'edit/:id', component: OrderedTripsEditComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'MANAGER|EXPLORER'} },
    { path: '**', redirectTo: '/not-found' }
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
export class OrderedTripsModule { }
