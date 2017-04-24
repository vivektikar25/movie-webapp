import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list.component';

const movieListRoutes = [
    { 
        path: 'list', 
        component: MovieListComponent, 
        data: { title: "Movie List" }
    }
]
@NgModule({
    imports: [
        RouterModule.forRoot(movieListRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MovieListRoutingModule { }