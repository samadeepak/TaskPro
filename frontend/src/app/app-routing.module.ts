import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MbtTestingComponent } from './views/mbt-testing/mbt-testing.component';
import { SettingsComponent } from './views/settings/settings.component';
import { LayoutModule } from './modules/layout/layout.module';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'mbt-testing',
    component: MbtTestingComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
