import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PageNotFoundComponent } from ''; // @todo page-not-found-component

const appRoutes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
