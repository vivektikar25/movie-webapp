import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { MovieService } from './../shared/movie.service';

@Injectable()
export class MovieDetailGuard implements Resolve<any> {
    
    constructor(private movieService: MovieService) { }

    resolve() {
        return this.movieService.getMovieList();
    }

}