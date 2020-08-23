import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationPageComponent } from './pages/configuration/configuration.page.component';
import { DemoPageComponent } from './pages/demo/demo.page.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { SelectionPageComponent } from './pages/selection/selection.page.component';

const routes: Routes = [
  { path: 'demo', component: DemoPageComponent },
  { path: 'config', component: ConfigurationPageComponent },
  { path: 'select', component: SelectionPageComponent },
  { path: '',   redirectTo: '/demo', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
