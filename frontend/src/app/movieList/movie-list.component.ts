import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../shared/movie.interface';
import { MovieService } from './../shared/movie.service';

@Component({
    selector: 'movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
    movies = [];
    filteredMovieList = [];
    filterBy: string;

    constructor(private toasterService: ToasterService,
                private movieService: MovieService){ }

    ngOnInit(){
        this.movieService.getMovieList()
                         .subscribe((data) => {
                            this.movies = data;
                            this.filteredMovieList = data;});
    }

    editMovie = (movieId: number): void => {
        this.resetMovieEditFlag(movieId, true);
    };
    
    resetMovieEditFlag = (movieId: number, status: boolean): void => {
        let movieIndex = this.movieService.getMoviesIndex(movieId, this.filteredMovieList);
        this.filteredMovieList[movieIndex]["isEditable"] = status;
    }

    saveChanges = (movieId): void => {
        let movieIndex = this.movieService.getMoviesIndex(movieId, this.filteredMovieList)
        let updatedMovieObject = this.filteredMovieList[movieIndex];
        let updatedMovie = this.movieService.removeEditFlags(updatedMovieObject);
        this.movieService.updateMovieDetail(movieId, updatedMovieObject)
                         .subscribe((successPayload) => {
                            this.toasterService.pop("success", "Success", "Movie detail updated successfully");   
                            this.resetMovieEditFlag(movieId, false);
                            },
                            (failurePayload)=> {
                                this.toasterService.pop("error", "Error", "Unable to save data make sure all edited values are valid");
                                this.resetMovieEditFlag(movieId, true);
                          });
    };

    gotoMovieDetail = (movieId): void => {
    
    };

    filterMovieList = () => {
        if(this.filterBy !== ""){
            this.filteredMovieList = this.movieService.filterMovies(this.filterBy, this.movies);
        }
        else{
            this.filteredMovieList = this.movies;
        }
    }
}
