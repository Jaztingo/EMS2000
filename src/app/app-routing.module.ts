import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { ClientbaseComponent } from './pages/clientbase/clientbase/clientbase.component';
import { ClientdetailComponent } from './pages/clientbase/clientdetail/clientdetail.component';
import { IndexComponent } from './pages/index/index.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'authorization',
    component: AuthorizationComponent
  },
  {
    path:'clientbase',
    component: ClientbaseComponent
  },
  {
    path:'clientdetail',
    component: ClientdetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
