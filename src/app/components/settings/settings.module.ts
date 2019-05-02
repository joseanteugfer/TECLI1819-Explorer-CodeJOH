import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActorRoleGuard } from 'src/app/guards/actor-role.guard';
import { SettingsDetailsComponent } from './settings-details/settings-details.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';
import { CoreModule } from 'src/app/core/core.module';


const declarables = [
    SettingsDetailsComponent,
    SettingsEditComponent
];

const routes = [
    { path : '', component: SettingsDetailsComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'ADMINISTRATOR'} },
    { path : 'edit/:id', component: SettingsEditComponent, canActivate: [ActorRoleGuard],
            data: { expectedRole: 'ADMINISTRATOR'} },
    { path: '**', redirectTo: '/not-found' }
];

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
export class SettingsModule { }
