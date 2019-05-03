import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActorRoleGuard } from 'src/app/guards/actor-role.guard';
import { SponsorshipsListComponent } from './sponsorships-list/sponsorships-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { DataTablesModule } from 'angular-datatables';


const declarables = [
    SponsorshipsListComponent
];

const routes = [
    { path : '', component: SponsorshipsListComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'SPONSOR'} },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        FormsModule,
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
export class SponsorshipsModule { }
