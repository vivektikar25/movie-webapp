import { MovieListComponent } from './movieList/movie-list.component';
import { MovieDetailComponent } from './movieDetail/movie-detail.component';

export const appRoutes = [
    { path: 'list', component: MovieListComponent, data: {title: "Movie List"}},
    { path: 'detail/:id', component: MovieDetailComponent, data: {title: "Movie Detail"}},
    { path: '', redirectTo: '/list', pathMatch: 'full'},
    { path: '**', component: MovieListComponent }
] 