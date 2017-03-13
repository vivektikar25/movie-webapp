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
    movieList = [];

    constructor(private http: Http,
                private toasterService: ToasterService) { }   

    getMovieList = () => {
        return this.http.get(MovieConstants.movieListApiUrl)
                        .map((res:Response) => {
                            let movieList: IMovie[] = res.json();
                            this.movieList = movieList; 
                            return movieList;
                        })
                        .catch((error: any) => {
                            this.toasterService.pop("error", "Error", "Failed to get your movies");
                            return Observable.throw(error.json().error || 'Server down')
                        });
                        
    }

    updateMovieDetail = (updateMovieId: number, updatedMovieObject: IMovie) => {
        return this.http.put(MovieConstants.movieListApiUrl + updateMovieId+ "/", updatedMovieObject)
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json()).error || 'Server down');
    }

    getMovieById = (movieId: number, movies: IMovie[]) => {
        let movie = movies.find(function(currentMovie){
            return currentMovie.id === movieId;
        });
        return movie;
    }

    updateLocalMovieList = (updateMovieId: number, updatedMovieObj: IMovie) =>{
        let movieIndex = this.movieList.findIndex((movie): boolean => {
            return updateMovieId == movie.id;
        });
        this.movieList[movieIndex] = updatedMovieObj;
    };

    getLocalMovieList = () => this.movieList;

    getFilteredList = (movieList: IMovie[], filterBy: string) =>{
        let lowerCaseFilterBy = filterBy.toLowerCase();
        let filteredList = movieList.filter(function(movie){
            let lowerCaseMovieTitle = movie.title.toLowerCase();
            return lowerCaseMovieTitle.includes(lowerCaseFilterBy);
        });
        return filteredList;
    }
}