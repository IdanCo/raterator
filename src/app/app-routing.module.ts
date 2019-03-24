import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CandidateEditComponent } from './components/candidate-edit/candidate-edit.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  {
    path: 'list',
    component: CandidateListComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'candidate',
    component: CandidateEditComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
  { path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
