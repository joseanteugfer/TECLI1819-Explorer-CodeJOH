import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActorRoleGuard } from 'src/app/guards/actor-role.guard';
import { SponsorshipsListComponent } from './sponsorships-list/sponsorships-list.component';


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
        CommonModule,
        FormsModule,
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
