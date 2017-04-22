import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movieList/movie-list.component';
import { MovieDetailComponent } from './movieDetail/movie-detail.component';
import { MovieDetailGuard } from './movieDetail/movie.detail.guard';

const appRoutes: Routes = [
    { path: 'list', component: MovieListComponent, data: {title: "Movie List"}},
    { path: 'detail/:id',
      component: MovieDetailComponent, 
      data: {
          title: "Movie Detail"
      },
      resolve: {
        movieList: MovieDetailGuard
      }
    },
    
    { path: '', redirectTo: '/list', pathMatch: 'full'},
    { path: '**', component: MovieListComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

