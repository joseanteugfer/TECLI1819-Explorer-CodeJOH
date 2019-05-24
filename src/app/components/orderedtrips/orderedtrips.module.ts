import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatFormFieldModule} from '@angular/material';
import { ActorRoleGuard } from 'src/app/guards/actor-role.guard';
import { OrderedTripsEditComponent } from './ordered-trips-edit/ordered-trips-edit.component';
import { OrderedTripsListComponent } from './ordered-trips-list/ordered-trips-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { DataTablesModule } from 'angular-datatables';


const declarables = [
    OrderedTripsEditComponent,
    OrderedTripsListComponent
];

const routes = [
    { path : '', component: OrderedTripsListComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'MANAGER|EXPLORER|ADMINISTRATOR'} },
    { path : 'edit/:id', component: OrderedTripsEditComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'MANAGER|EXPLORER'} },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        DataTablesModule,
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
