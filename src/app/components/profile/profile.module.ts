import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActorRoleGuard } from 'src/app/guards/actor-role.guard';
import { ProfileDisplayComponent } from './profile-display/profile-display.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { CoreModule } from 'src/app/core/core.module';
import locales from '@angular/common/locales/es';



const declarables = [
    ProfileDisplayComponent,
    ProfileEditComponent
];

const routes = [
    { path : '', component: ProfileDisplayComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER|SPONSOR'} },
    { path : 'edit/:id', component: ProfileEditComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'ADMINISTRATOR|MANAGER|EXPLORER|SPONSOR'} },
    { path: '**', redirectTo: '/not-found' }
];

registerLocaleData(locales, 'es');

@NgModule({
    imports: [
        CoreModule,
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
