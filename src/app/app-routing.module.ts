import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C404Component } from './components/c404/c404.component';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/home/user-profile/user-profile.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo: 'home'},
  {path: "home", component: HomeComponent},
  {path: "user/:id",component: UserProfileComponent},
  {path: "updateuser/:id",component: CreateUpdateComponent},
  {path: "newuser",component: CreateUpdateComponent},
  { path: "**", component: C404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
