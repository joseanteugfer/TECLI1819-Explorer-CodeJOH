import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActorRoleGuard } from 'src/app/guards/actor-role.guard';
import { ProfileDisplayComponent } from './profile-display/profile-display.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';


const declarables = [
    ProfileDisplayComponent,
    ProfileEditComponent
];

const routes = [
    { path : '', component: ProfileDisplayComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER'} },
    { path : 'edit/:id', component: ProfileEditComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER'} },
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
export class ProfileModule { }
