import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ LoginComponent } from '../app/login/login.component';
import{ MoviesComponent } from '../app/movies/movies.component';
import { AuthGuard } from '../app/guard/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent,},
  {path:'movies',component:MoviesComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
