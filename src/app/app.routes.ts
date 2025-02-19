import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user/user-detail/detail.component';
import { UserListComponent } from './user/user-list/list.component';
import { userDetailResolver } from './user/user-resolver/user-detail.resolver';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'usersList', component: UserListComponent },
  {
    path: 'userDetail/:id',
    component: UserDetailComponent,
    resolve: { userData: userDetailResolver },
  },
  { path: '**', component: DashboardComponent },
];
