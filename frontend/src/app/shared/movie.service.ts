import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IMovie } from './movie.interface';
import { MovieConstants } from './movie.constants';

@Injectable()
export class MovieService {
    movieList: IMovie[] = [];

    constructor(private http: Http,
                private toasterService: ToasterService) { }   

    getMovieList = () => {
        return this.http.get(MovieConstants.movieListApiUrl)
                        .map((res:Response) => {
                            let data = res.json();
                            let movieList: IMovie[] = this.addEditFlags(data); 
                            this.movieList = movieList; 
                            return movieList;
                        })
                        .catch((error: any) => {
                            this.toasterService.pop("error", "Error", "Failed to get your movies");
                            return Observable.throw(error.json().error || 'Server down')
                        });
                        
    }

    updateMovieDetail = (updateMovieId, updatedMovieObject) => {
        return this.http.put(MovieConstants.movieListApiUrl + updateMovieId+ "/", updatedMovieObject)
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json()).error || 'Server down');
    }

    getMoviesIndex = (movieId, movies) => {
        let movieIndex = movies.findIndex(function(currentMovie){
            return currentMovie.id === movieId;
        });
        return movieIndex;
    }

    addEditFlags = (movieList) => {
        let movieListWithEditFlags = movieList.map((movie) => {
            movie.isEditableInListView = false;
            movie.isEditableInDetailView = false;
            return movie;
        });

        return movieListWithEditFlags;
    }

}